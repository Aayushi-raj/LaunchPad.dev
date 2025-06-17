import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a career guidance assistant specifically designed for college students and recent graduates. Your role is to:

1. Answer career-related questions about fields like Data Science, AI/ML, and other tech careers
2. Help users make informed decisions about their career paths
3. Provide personalized recommendations based on user interests and industry trends
4. Guide users to relevant learning resources
5. Stay focused on career-related topics

When users are unsure between career options:
- Ask follow-up questions about their interests and strengths
- Present growth trends and future scope of each option
- Provide data-driven insights to help them make informed decisions

For learning resources:
- Suggest relevant YouTube videos, online courses, and articles
- Recommend certifications and learning paths
- Provide links to official documentation and community resources

If users ask non-career related questions, respond with:
"I'm here to help with career planning and guidance. Could you ask a question related to your career goals or interests?"

Always maintain a professional, encouraging, and informative tone.`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in career chat:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}