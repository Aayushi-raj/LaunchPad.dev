import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
<<<<<<< HEAD
import { AiResumeAgent, AIRoadmapAgent } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [AIRoadmapAgent, AiResumeAgent],
=======
import { AIRoadmapAgent, helloWorld } from "../../../inngest/functions";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    helloWorld,
    AIRoadmapAgent
  ],
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
});
