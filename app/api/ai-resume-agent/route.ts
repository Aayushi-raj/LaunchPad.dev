// import { NextRequest, NextResponse } from "next/server";
// import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
// import { inngest } from "../../../inngest/client";
// import axios from "axios";
// import { auth } from "@clerk/nextjs/server";

// export async function POST(req: NextRequest) {
//     console.log("🚀 === RESUME ANALYSIS API STARTED ===");

//     try {
//         // Step 1: Parse FormData
//         console.log("1️⃣ Parsing FormData...");
//         const formData = await req.formData();
//         const resumeFile = formData.get("resumeFile") as File;
        
//         // Get user with better error handling
//         let userEmail = "unknown@example.com";
//         try {
//             const { userId } = await auth();
//             if (userId) {
//                 // If you need user details, you can fetch them here
//                 // For now, we'll use a default email
//                 userEmail = `user-${userId}@example.com`;
//                 console.log("✅ User authenticated:", userId);
//             } else {
//                 console.warn("⚠️ No user ID found, using default email");
//             }
//         } catch (authError) {
//             console.warn("⚠️ Authentication failed, using default email:", authError);
//             // Continue with default email
//         }
        
//         const recordId = formData.get("recordId") as string;

//         console.log("📋 FormData contents:");
//         console.log("- Resume file:", resumeFile ? `${resumeFile.name} (${resumeFile.size} bytes)` : "NULL");
//         console.log("- Record ID:", recordId || "NULL");
//         console.log("- User email:", userEmail);

//         if (!resumeFile) {
//             console.log("❌ No resume file provided");
//             return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
//         }

//         if (!recordId) {
//             console.log("❌ No recordId provided");
//             return NextResponse.json({ error: "No recordId provided" }, { status: 400 });
//         }

//         // Step 2: Extract PDF text
//         console.log("2️⃣ Extracting PDF text...");
//         let pdfText = "";
//         try {
//             const loader = new WebPDFLoader(resumeFile);
//             const docs = await loader.load();
//             pdfText = docs[0]?.pageContent || "";
//             console.log("✅ PDF extraction successful. Text length:", pdfText.length);
//             console.log("📄 First 200 chars:", pdfText.slice(0, 200));
//         } catch (pdfError) {
//             console.error("❌ PDF extraction failed:", pdfError);
//             return NextResponse.json({ error: "Failed to extract PDF text", details: pdfError }, { status: 400 });
//         }

//         // Step 3: Convert to base64
//         console.log("3️⃣ Converting to base64...");
//         let based64 = "";
//         try {
//             const arrayBuffer = await resumeFile.arrayBuffer();
//             based64 = Buffer.from(arrayBuffer).toString("base64");
//             console.log("✅ Base64 conversion successful. Length:", based64.length);
//         } catch (base64Error) {
//             console.error("❌ Base64 conversion failed:", base64Error);
//             return NextResponse.json({ error: "Failed to convert file to base64", details: base64Error }, { status: 400 });
//         }

//         // Step 4: Check environment variables
//         console.log("4️⃣ Checking environment variables...");
//         console.log("- INNGEST_SERVER_HOST:", process.env.INNGEST_SERVER_HOST ? "✅ Set" : "❌ Missing");
//         console.log("- INNGEST_SIGNING_KEY:", process.env.INNGEST_SIGNING_KEY ? "✅ Set" : "❌ Missing");
//         console.log("- GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Missing");

//         // Step 5: Test Inngest client
//         console.log("5️⃣ Testing Inngest client...");
//         console.log("- Inngest client ID:", inngest.id);

//         // Step 6: Send Inngest event
//         console.log("6️⃣ Sending Inngest event...");
//         let resultIds;
//         try {
//             resultIds = await inngest.send({
//                 name: "AiResumeAgent",
//                 data: {
//                     recordId,
//                     based64ResumeFile: based64,
//                     pdfText,
//                     aiAgentType: "ai-tools/ai-resume-analyzer",
//                     userEmail: userEmail,
//                 },
//             });
//             console.log("✅ Inngest event sent successfully:", resultIds);
//         } catch (inngestError) {
//             console.error("❌ Inngest send failed:", inngestError);
//             return NextResponse.json({
//                 error: "Failed to send Inngest event",
//                 details: inngestError,
//                 inngestId: inngest.id
//             }, { status: 500 });
//         }

//         const runId = resultIds?.ids?.[0];
//         if (!runId) {
//             console.log("❌ No runId received from Inngest");
//             console.log("Full resultIds:", JSON.stringify(resultIds, null, 2));
//             return NextResponse.json({ error: "No runId received from Inngest", resultIds }, { status: 500 });
//         }

//         console.log("🆔 Run ID received:", runId);

//         // Step 7: Poll for results
//         console.log("7️⃣ Starting to poll for results...");
//         let runStatus;
//         let attempts = 0;
//         const maxAttempts = 60;

//         while (attempts < maxAttempts) {
//             try {
//                 console.log(`📊 Poll attempt ${attempts + 1}/${maxAttempts}`);
//                 runStatus = await getRuns(runId);

//                 const status = runStatus?.data?.[0]?.status;
//                 console.log(`- Status: ${status}`);

//                 if (status === "Completed") {
//                     console.log("✅ Run completed successfully!");
//                     break;
//                 } else if (status === "Failed") {
//                     console.log("❌ Run failed!");
//                     console.log("- Error details:", runStatus?.data?.[0]?.error);
//                     break;
//                 } else if (status === "Cancelled") {
//                     console.log("⚠️ Run was cancelled");
//                     break;
//                 }

//                 await new Promise((res) => setTimeout(res, 500));
//                 attempts++;
//             } catch (pollError) {
//                 console.error(`❌ Poll attempt ${attempts + 1} failed:`, pollError);
//                 attempts++;
//                 if (attempts < maxAttempts) {
//                     await new Promise((res) => setTimeout(res, 1000));
//                 }
//             }
//         }

//         if (attempts >= maxAttempts) {
//             console.log("⏰ Polling timeout reached");
//             return NextResponse.json({ error: "Timeout waiting for analysis" }, { status: 408 });
//         }

//         // Step 8: Extract results
//         console.log("8️⃣ Extracting results...");
//         const finalStatus = runStatus?.data?.[0]?.status;
//         const rawOutput = runStatus?.data?.[0]?.output;

//         console.log("📊 Final status:", finalStatus);
//         console.log("📄 Raw output type:", typeof rawOutput);
//         console.log("📄 Raw output:", JSON.stringify(rawOutput, null, 2));

//         if (finalStatus === "Failed") {
//             return NextResponse.json({
//                 error: "AI analysis failed",
//                 details: runStatus?.data?.[0]
//             }, { status: 500 });
//         }

//         // Return raw output for now to see what we're getting
//         console.log("✅ === RESUME ANALYSIS API COMPLETED ===");
//         return NextResponse.json({
//             success: true,
//             status: finalStatus,
//             output: rawOutput,
//             runId: runId
//         });

//     } catch (error: any) {
//         console.error("💥 === CRITICAL ERROR ===");
//         console.error("Error type:", typeof error);
//         console.error("Error message:", error.message);
//         console.error("Error stack:", error.stack);
//         console.error("Full error:", error);

//         return NextResponse.json({
//             error: "Internal Server Error",
//             details: {
//                 message: error.message,
//                 type: typeof error,
//                 stack: error.stack
//             }
//         }, { status: 500 });
//     }
// }

// async function getRuns(runId: string) {
//     const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;
//     console.log("🔗 Polling URL:", url);

//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//             },
//             timeout: 10000, // 10 second timeout
//         });
//         return response.data;
//     } catch (axiosError: any) {
//         console.error("❌ Axios error details:");
//         console.error("- Status:", axiosError.response?.status);
//         console.error("- Data:", axiosError.response?.data);
//         console.error("- Headers:", axiosError.response?.headers);
//         throw axiosError;
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "../../../inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    console.log("🚀 === RESUME ANALYSIS API STARTED ===");

    try {
        // Step 1: Parse FormData
        console.log("1️⃣ Parsing FormData...");
        const formData = await req.formData();
        const resumeFile = formData.get("resumeFile") as File;
        let user;
        try {
            user = await currentUser();
        } catch {
            user = null;
        }
        const recordId = formData.get("recordId") as string;

        console.log(`📋 FormData contents:`);
        console.log(`- Resume file: ${resumeFile ? `${resumeFile.name} (${resumeFile.size} bytes)` : "NULL"}`);
        console.log(`- Record ID: ${recordId || "NULL"}`);

        if (!resumeFile) {
            console.log("❌ No resume file provided");
            return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
        }

        if (!recordId) {
            console.log("❌ No recordId provided");
            return NextResponse.json({ error: "No recordId provided" }, { status: 400 });
        }

        // Step 2: Extract PDF text
        console.log("2️⃣ Extracting PDF text...");
        let pdfText = "";
        try {
            const loader = new WebPDFLoader(resumeFile);
            const docs = await loader.load();
            pdfText = docs[0]?.pageContent || "";
            console.log("✅ PDF extraction successful. Text length:", pdfText.length);
            console.log("📄 First 200 chars:", pdfText.slice(0, 200));
        } catch (pdfError) {
            console.error("❌ PDF extraction failed:", pdfError);
            return NextResponse.json({ error: "Failed to extract PDF text", details: pdfError }, { status: 400 });
        }

        // Step 3: Convert to base64
        console.log("3️⃣ Converting to base64...");
        let based64 = "";
        try {
            const arrayBuffer = await resumeFile.arrayBuffer();
            based64 = Buffer.from(arrayBuffer).toString("base64");
            console.log("✅ Base64 conversion successful. Length:", based64.length);
        } catch (base64Error) {
            console.error("❌ Base64 conversion failed:", base64Error);
            return NextResponse.json({ error: "Failed to convert file to base64", details: base64Error }, { status: 400 });
        }

        // Step 4: Check environment variables
        console.log("4️⃣ Checking environment variables...");
        console.log("- INNGEST_SERVER_HOST:", process.env.INNGEST_SERVER_HOST ? "✅ Set" : "❌ Missing");
        console.log("- INNGEST_SIGNING_KEY:", process.env.INNGEST_SIGNING_KEY ? "✅ Set" : "❌ Missing");
        console.log("- GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Missing");

        // Step 5: Test Inngest client
        console.log("5️⃣ Testing Inngest client...");
        console.log("- Inngest client ID:", inngest.id);

        // Step 6: Send Inngest event
        console.log("6️⃣ Sending Inngest event...");
        let resultIds;
        try {
            resultIds = await inngest.send({
                name: "AiResumeAgent",
                data: {
                    recordId,
                    based64ResumeFile: based64,
                    pdfText,
                    aiAgentType: "ai-tools/ai-resume-analyzer",
                    userEmail: user?.primaryEmailAddress?.emailAddress || "unknown",
                },
            });
            console.log("✅ Inngest event sent successfully:", resultIds);
        } catch (inngestError) {
            console.error("❌ Inngest send failed:", inngestError);
            return NextResponse.json({
                error: "Failed to send Inngest event",
                details: inngestError,
                inngestId: inngest.id
            }, { status: 500 });
        }

        const runId = resultIds?.ids?.[0];
        if (!runId) {
            console.log("❌ No runId received from Inngest");
            console.log("Full resultIds:", JSON.stringify(resultIds, null, 2));
            return NextResponse.json({ error: "No runId received from Inngest", resultIds }, { status: 500 });
        }

        console.log("🆔 Run ID received:", runId);

        // Step 7: Poll for results
        console.log("7️⃣ Starting to poll for results...");
        let runStatus;
        let attempts = 0;
        const maxAttempts = 60;

        while (attempts < maxAttempts) {
            try {
                console.log(`📊 Poll attempt ${attempts + 1}/${maxAttempts}`);
                runStatus = await getRuns(runId);

                const status = runStatus?.data?.[0]?.status;
                console.log(`- Status: ${status}`);

                if (status === "Completed") {
                    console.log("✅ Run completed successfully!");
                    break;
                } else if (status === "Failed") {
                    console.log("❌ Run failed!");
                    console.log("- Error details:", runStatus?.data?.[0]?.error);
                    break;
                } else if (status === "Cancelled") {
                    console.log("⚠ Run was cancelled");
                    break;
                }

                await new Promise((res) => setTimeout(res, 500));
                attempts++;
            } catch (pollError) {
                console.error(`❌ Poll attempt ${attempts + 1} failed:`, pollError);
                attempts++;
                if (attempts < maxAttempts) {
                    await new Promise((res) => setTimeout(res, 1000));
                }
            }
        }

        if (attempts >= maxAttempts) {
            console.log("⏰ Polling timeout reached");
            return NextResponse.json({ error: "Timeout waiting for analysis" }, { status: 408 });
        }

        // Step 8: Extract results
        console.log("8️⃣ Extracting results...");
        const finalStatus = runStatus?.data?.[0]?.status;
        const rawOutput = runStatus?.data?.[0]?.output;

        console.log("📊 Final status:", finalStatus);
        console.log("📄 Raw output type:", typeof rawOutput);
        console.log("📄 Raw output:", JSON.stringify(rawOutput, null, 2));

        if (finalStatus === "Failed") {
            return NextResponse.json({
                error: "AI analysis failed",
                details: runStatus?.data?.[0]
            }, { status: 500 });
        }

        // Return raw output for now to see what we're getting
        console.log("✅ === RESUME ANALYSIS API COMPLETED ===");
        return NextResponse.json({
            success: true,
            status: finalStatus,
            output: rawOutput,
            runId: runId
        });

    } catch (error: any) {
        console.error("💥 === CRITICAL ERROR ===");
        console.error("Error type:", typeof error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Full error:", error);

        return NextResponse.json({
            error: "Internal Server Error",
            details: {
                message: error.message,
                type: typeof error,
                stack: error.stack
            }
        }, { status: 500 });
    }
}

async function getRuns(runId: string) {
    const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;
    console.log("🔗 Polling URL:", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
            },
            timeout: 10000, // 10 second timeout
        });
        return response.data;
    } catch (axiosError: any) {
        console.error("❌ Axios error details:");
        console.error("- Status:", axiosError.response?.status);
        console.error("- Data:", axiosError.response?.data);
        console.error("- Headers:", axiosError.response?.headers);
        throw axiosError;
    }
}