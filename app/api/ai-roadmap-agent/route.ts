import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { inngest } from "@/lib/inngest";

export async function POST(req: NextRequest) {
    try {
        const { roadmapId, userInput } = await req.json();
        
        // Get user with better error handling
        let userEmail = "unknown@example.com";
        try {
            const { userId } = await auth();
            if (userId) {
                userEmail = `user-${userId}@example.com`;
                console.log("✅ User authenticated:", userId);
            } else {
                console.warn("⚠️ No user ID found, using default email");
            }
        } catch (authError) {
            console.warn("⚠️ Authentication failed, using default email:", authError);
            // Continue with default email
        }

        console.log("🎯 Received user input:", userInput);

        // 1. Send Inngest event
        const resultIds = await inngest.send({
            name: "AIRoadmapAgent",
            data: {
                userInput,
                roadmapId,
                userEmail: userEmail,
            },
        });

        console.log("📤 Inngest event sent, result IDs:", resultIds);

        const runId = resultIds?.ids?.[0];
        if (!runId) throw new Error("❌ Missing runId from Inngest result.");

        // 2. Poll Inngest for result
        let runStatus;
        while (true) {
            runStatus = await getRuns(runId);
            console.log("📊 Polled run status:", runStatus?.data);

            const status = runStatus?.data?.[0]?.status;
            if (["Completed", "Cancelled", "Failed"].includes(status)) break;

            await new Promise((res) => setTimeout(res, 500)); // wait 500ms
        }

        // 3. Extract and parse AI output
        let rawOutput = runStatus?.data?.[0]?.output?.output;
        console.log("📄 Raw AI output:", rawOutput);

        if (typeof rawOutput === "string") {
            rawOutput = rawOutput
                .replace(/^```json/, "")
                .replace(/^```/, "")
                .replace(/```$/, "")
                .trim();

            try {
                const parsedOutput = JSON.parse(rawOutput);
                console.log("✅ Parsed AI output:", parsedOutput);
                return NextResponse.json(parsedOutput);
            } catch (parseError) {
                console.error("❌ JSON parse failed:", parseError);
                return NextResponse.json(
                    { error: "Failed to parse AI output", raw: rawOutput },
                    { status: 500 }
                );
            }
        }

        // If rawOutput is already an object
        return NextResponse.json(
            rawOutput || { message: "No output received from AI." }
        );
    } catch (error: any) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message || error },
            { status: 500 }
        );
    }
}

// 🔁 Poll Inngest run status
async function getRuns(runId: string) {
    const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
        },
    });

    return response.data;
}
