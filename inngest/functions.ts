import { metadata } from "@/app/layout";
import { Inngest, NonRetriableError } from "inngest";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import ImageKit from "imagekit";
// import { HistoryTable } from "@/configs/schema";
import { db } from "@/configs/db";

// Simple test function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Create the AI agent
export const AIRoadmapGeneratorAgent = createAgent({
  name: "AIRoadmapGeneratorAgent",
  description: "Generate tree-like flow roadmap",
  system: `Generate a React Flow tree-structured learning roadmap for user input position/skills in the following format:

• Vertical tree structure with meaningful x/y positions to form a flow  
• Structure should be similar to roadmap.sh layout  
• Steps should be ordered from fundamentals to advanced  
• Include branching for different specializations (if applicable)  
• Each node must have a title, short description, and learning resource link  
• Use unique IDs for all nodes and edges  
• Make it more spacious node position  
• Response in JSON format

{
  roadmapTitle: "",
  description: <3-5 Lines>,
  duration: "",
  initialNodes: [
    {
      id: "1",
      type: "turbo",
      position: { x: 0, y: 0 },
      data: {
        title: "Step Title",
        description: "Short two-line explanation of what the step covers.",
        link: "Helpful link for learning this step",
      }
    }
  ],
  initialEdges: [
    {
      id: "e1-2",
      source: "1",
      target: "2"
    }
  ]
}
`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.Gemini_API_KEY
  })
});

// Type guard for safe content access
function hasContent(msg: any): msg is { content: string } {
  return typeof msg === "object" && "content" in msg && typeof msg.content === "string";
}

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
});

// Create the AI Resume Analyzer Agent
export const AiResumeAnalyserAgent = createAgent({
  name: "AiResumeAnalyserAgent",
  description: "AI Resume Analyzer Agent helps to Return Report",
  system: `
You are an advanced AI Resume Analyzer agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.

INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:

- overall_score (0–100)
- overall_feedback (short message e.g., "Excellent", "Needs improvement")
- summary_comment (1–2 sentence evaluation summary)
- Section scores for:
  - Contact Info
  - Experience
  - Education
  - Skills
  Each section should include:
    - score (as percentage)
    - Optional comment about that section
- Tips for improvement (3–5 tips)
- What's Good (1–3 strengths)
- Needs Improvement (1–3 weaknesses)

Output JSON Schema:
{
  "overall_score": 85,
  "overall_feedback": "Excellent!",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 72,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 68,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "tips_for_improvement": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail.",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.
Input Resume plain text format:`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || process.env.Gemini_API_KEY
  })
});

// Main Inngest function for Resume Analysis
export const AiResumeAgent = inngest.createFunction(
  {
    id: "AiResumeAgent",
    name: "AI Resume Analyzer Function",
    // Add timeout and retry configuration
    retries: 3,
  },
  { event: "AiResumeAgent" }, // Event name that triggers this function
  async ({ event, step }) => {
    console.log("🚀 AiResumeAgent function started");
    console.log("📥 Event data received:", {
      recordId: event.data.recordId,
      hasBase64File: !!event.data.based64ResumeFile,
      textLength: event.data.pdfText?.length || 0
    });

    const { recordId, based64ResumeFile, pdfText, aiAgentType, userEmail } = event.data;

    // Validate input data
    if (!recordId) {
      console.error("❌ Missing recordId");
      throw new Error("Missing recordId in event data");
    }

    if (!pdfText) {
      console.error("❌ Missing pdfText");
      throw new Error("Missing pdfText in event data");
    }

    if (!based64ResumeFile) {
      console.error("❌ Missing based64ResumeFile");
      throw new Error("Missing based64ResumeFile in event data");
    }

    // Step 1: Upload resume to ImageKit (optional, can be skipped for testing)
    let uploadImageUrl = null;
    try {
      uploadImageUrl = await step.run("Upload Resume to ImageKit", async () => {
        console.log("📤 Uploading to ImageKit...");
        
        // Validate ImageKit configuration
        if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
          throw new Error("ImageKit configuration is incomplete. Missing required environment variables.");
        }

        // Validate file data
        if (!based64ResumeFile || typeof based64ResumeFile !== 'string') {
          throw new Error("Invalid file data provided for upload");
        }

        // Remove data URL prefix if present
        const base64Data = based64ResumeFile.includes('data:') 
          ? based64ResumeFile.split(',')[1] 
          : based64ResumeFile;

        const imageKitFile = await imagekit.upload({
          file: base64Data,
          fileName: `resume-${recordId}-${Date.now()}.pdf`,
          isPublished: true,
          folder: "/resumes" // Optional: organize files in a folder
        });
        
        console.log("✅ ImageKit upload successful:", imageKitFile.url);
        return imageKitFile.url;
      });
    } catch (uploadError) {
      console.error("⚠ ImageKit upload failed, continuing without it:", uploadError);
      // Don't fail the entire function if ImageKit upload fails
      // You might want to log this for monitoring purposes
    }

    // Step 2: Analyze resume with AI
    const aiResumeReport = await step.run("Analyze Resume with AI", async () => {
      console.log("🤖 Starting AI analysis...");
      console.log("📄 Text to analyze (first 200 chars):", pdfText.slice(0, 200));

      try {
        const result = await AiResumeAnalyserAgent.run(pdfText);
        console.log("✅ AI analysis completed");
        console.log("📊 AI result type:", typeof result);
        console.log("📊 AI result:", result);
        return result;
      } catch (aiError) {
        console.error("❌ AI analysis failed:", aiError);
        const errorMessage = (aiError instanceof Error) ? aiError.message : String(aiError);
        throw new Error(`AI analysis failed: ${errorMessage}`);
      }
    });

    // Step 3: Parse the AI result
    const parsedResult = await step.run("Parse AI Result", async () => {
      try {
        //@ts-ignore
        const rawContent = aiResumeReport.output[0].content;
        const rawContentJson = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsedJson = JSON.parse(rawContentJson);
        return parsedJson;
      } catch (parseError) {
        console.error("❌ Failed to parse AI result:", parseError);
        throw new Error("Failed to parse AI analysis result");
      }
    });
   return parsedResult;
    // Step 4: Save to database (optional - can be implemented later)
    const savedData = await step.run("Save Analysis Result", async () => {
      console.log("💾 Saving analysis result...");
      // TODO: Implement database saving logic here
      const resultToSave = {
        recordId,
        analysis: parsedResult,
        uploadUrl: uploadImageUrl,
        createdAt: new Date().toISOString(),
        // Add other metadata as needed
      };

      console.log("✅ Analysis result prepared for saving");
      return resultToSave;
    });

    console.log("🎉 AiResumeAgent function completed successfully");
    return {
      success: true,
      recordId: recordId,
      uploadUrl: uploadImageUrl,
      analysis: parsedResult,
      savedData: savedData
    };
  }
);

// Main Inngest function to run the AI agent
export const AIRoadmapAgent = inngest.createFunction(
  { id: "AIRoadMapAgent", retries: 3 },
  { event: "AIRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = event.data;

    console.log("🚀 AIRoadmapAgent function started");
    console.log("📥 Event data received:", event.data);

    // Validate input
    if (!roadmapId || !userInput || !userEmail) {
      throw new NonRetriableError("Missing required event data: roadmapId, userInput, or userEmail");
    }

    // Step 1: Generate the roadmap using the AI agent
    const roadmapResult = await step.run("Generate AI Roadmap", async () => {
      try {
        console.log("🤖 Starting AI roadmap generation...");
        const result = await AIRoadmapGeneratorAgent.run("userInput: " + userInput);
        console.log("✅ AI roadmap generation successful.");
        return result;
      } catch (error) {
        console.error("❌ AI roadmap generation failed:", error);
        throw new Error("Failed to generate AI roadmap");
      }
    });

    // Step 2: Parse the AI response
    const parsedJson = await step.run("Parse AI Response", async () => {
      const messageWithContent = roadmapResult.output.find(hasContent);
      if (!messageWithContent) {
        console.error("❌ Agent response does not contain valid content.");
        throw new Error("Agent response does not contain valid content.");
      }

      try {
        const rawContentJson = (messageWithContent as { content: string }).content
          .replace("```json", "")
          .replace("```", "")
          .trim();
        const parsed = JSON.parse(rawContentJson);
        console.log("✅ AI response parsed successfully.");
        return parsed;
      } catch (error) {
        console.error("❌ Failed to parse AI response JSON:", error);
        throw new NonRetriableError("Failed to parse AI response JSON");
      }
    });
    // Step 3: Save the result to the database
    const saveToDb = await step.run("Save Roadmap to DB", async () => {
      try {
        // The database insertion logic is currently commented out.
        // To enable it, you would uncomment the following lines and ensure
        // the HistoryTable schema is correctly imported and configured.
        /*
        console.log("💾 Saving roadmap to database...");
        const result = await db.insert(HistoryTable).values({
          recordId: roadmapId,
          content: parsedJson,
          aiAgentType: "/ai-tools/ai-roadmap-agent",
          createdAt: new Date().toISOString(),
          userEmail: userEmail,
          metadata: userInput,
        });
        console.log("✅ Roadmap saved to database successfully.", result);
        return result;
        */
        console.log("✅ Roadmap prepared for saving (DB logic is commented out).");
        return parsedJson; // Returning parsed data for now
      } catch (error) {
        console.error("❌ Error saving to DB:", error);
        throw new NonRetriableError("Failed to save to database", { cause: error });
      }
    });

    console.log("🎉 AIRoadmapAgent function completed successfully");
    return { success: true, data: saveToDb };
  }
);
