console.log("📦 AIRoadmapAgent loaded");

import { metadata } from "@/app/layout";
import { Inngest } from "inngest";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

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

// Main Inngest function to run the AI agent
export const AIRoadmapAgent = inngest.createFunction(
  { id: "AIRoadMapAgent" },
  { event: "AIRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = event.data;
    console.log("Running Agent...");
    const roadmapResult = await AIRoadmapGeneratorAgent.run("userInput: " + userInput);
    console.log("Agent Output:", roadmapResult.output);
    const messageWithContent = roadmapResult.output.find(hasContent);

    if (!messageWithContent) {
      throw new Error("Agent response does not contain valid content.");
    }

    // messageWithContent is guaranteed to have 'content' due to the type guard
    const rawContentJson = (messageWithContent as { content: string }).content
      .replace("```json", "")
      .replace("```", "");

    const parsedJson = JSON.parse(rawContentJson);

    const saveToDb = await step.run("SaveToDb", async () => {
      // Example: insert logic (uncomment and modify if DB is used)
      /*
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parsedJson,
        aiAgentType: "/ai-tools/ai-roadmap-agent",
        createdAt: new Date().toISOString(),
        userEmail: userEmail,
        metadata: userInput,
      });
      console.log(result);
      */
      return parsedJson;
    });

    return { success: true, data: saveToDb };
  }
);
