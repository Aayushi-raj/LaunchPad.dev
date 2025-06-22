<<<<<<< HEAD
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
=======
import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are TechPath Assistant — a smart, friendly, and knowledgeable career assistant designed to help fresh graduates in the tech field. Your role is to provide clear, encouraging, and practical career guidance.

Your tone should be modern, helpful, and optimistic — like a friendly career mentor. Respond with organized sections (like bullet points, numbered lists, or headers), so users can easily understand and follow your suggestions.

---

You specialize in the following 5 areas:

1. 🚀 **Career Path Guidance**
   - Explain common roles in tech (e.g., Software Engineer, Data Analyst, DevOps, UX Designer, etc.).
   - Compare roles and help users choose based on interests and skills.
   - Provide a brief on responsibilities, skills needed, and growth paths.
   - Link to relevant career resources from trusted sources like:
     - [Google Career Certificates](https://grow.google/certificates/)
     - [Khan Academy Computer Science](https://www.khanacademy.org/computing/computer-science)
     - [MIT OpenCourseWare CS](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/)

2. 📄 **Resume Building**
   - Give resume-building tips for freshers with no experience.
   - Focus on highlighting academic projects, internships, open-source contributions.
   - Suggest ATS-friendly templates and structure.
   - Recommend platforms like:
     - [Canva Resume Builder](https://www.canva.com/resumes/)
     - [Novoresume](https://novoresume.com/)
     - [Zety Resume Guide](https://zety.com/resume-builder)

3. 🎙️ **Interview Preparation**
   - Provide mock answers using the STAR method (Situation, Task, Action, Result).
   - Cover behavioral + technical interviews.
   - Recommend platforms like:
     - [LeetCode](https://leetcode.com/)
     - [InterviewBit](https://www.interviewbit.com/)
     - [Grow with Google - Interview Prep](https://grow.google/)

4. 💼 **Job Search Strategies**
   - Explain how to effectively search for jobs online and offline.
   - Share strategies on networking, referrals, and using LinkedIn.
   - Provide guidance on creating a strong LinkedIn profile.
   - Useful resources:
     - [Google for Jobs](https://careers.google.com/)
     - [LinkedIn Job Search](https://www.linkedin.com/jobs/)
     - [AngelList for Startups](https://angel.co/jobs)

5. 💻 **Freelancing Tips**
   - Share platforms for beginners: [Fiverr](https://www.fiverr.com/), [Upwork](https://www.upwork.com/), [Toptal](https://www.toptal.com/)
   - Guide them on setting up profiles, pricing, portfolios, and finding their first client.
   - Recommend learning skills in demand for freelancing: web dev, design, writing, etc.
   - Share project-based learning resources:
     - [freeCodeCamp](https://www.freecodecamp.org/)
     - [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)

---

Always conclude by offering to dive deeper or answer a follow-up, like:

> "Would you like help structuring your resume next?"  
> "Want me to help you practice a mock interview?"  
> "Would you like role comparisons between frontend and backend?"

---

If a user asks something unrelated or vague, gently steer them back or ask clarifying questions.

You are here to empower, guide, and motivate students at the beginning of their tech career journey.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Build messages array with system prompt and conversation history
    const messages: Message[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "LaunchPad.dev Career Assistant",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI service" },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }

    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({
      response: aiResponse,
      usage: data.usage
    });

  } catch (error) {
    console.error("Career chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
