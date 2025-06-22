// Create this file: app/api/test-inngest/route.ts

import { NextRequest, NextResponse } from "next/server";
import { inngest } from "../../../inngest/client";

export async function POST(req: NextRequest) {
    console.log("🧪 Testing Inngest connection...");

    try {
        // Test 1: Check client
        console.log("1️⃣ Inngest client ID:", inngest.id);

        // Test 2: Send a simple event
        console.log("2️⃣ Sending test event...");
        const result = await inngest.send({
            name: "test/hello.world",
            data: {
                email: "test@example.com",
                timestamp: new Date().toISOString()
            }
        });

        console.log("✅ Test event sent successfully:", result);

        return NextResponse.json({
            success: true,
            inngestId: inngest.id,
            testResult: result,
            message: "Inngest connection working!"
        });

    } catch (error: any) {
        console.error("❌ Inngest test failed:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            details: error
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Use POST to test Inngest connection",
        inngestId: inngest.id,
        env: {
            serverHost: process.env.INNGEST_SERVER_HOST ? "Set" : "Missing",
            signingKey: process.env.INNGEST_SIGNING_KEY ? "Set" : "Missing",
            geminiKey: process.env.GEMINI_API_KEY ? "Set" : "Missing"
        }
    });
}