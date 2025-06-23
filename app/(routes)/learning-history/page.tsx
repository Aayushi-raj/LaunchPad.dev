"use client";
import { MessageCircle, Clock } from "lucide-react";

const history = [
  {
    question: "What are the fastest-growing tech careers in 2025?",
    answer: "AI, Machine Learning, Data Science, Cloud Engineering, and Cybersecurity are among the fastest-growing tech careers in 2025. Upskill in these areas for future-proof opportunities.",
    time: "2 hours ago"
  },
  {
    question: "How do I prepare for a tech interview as a fresher?",
    answer: "Focus on data structures, algorithms, and behavioral questions. Practice coding on LeetCode, and review common interview patterns. Prepare a strong resume and portfolio.",
    time: "Yesterday"
  },
  {
    question: "What skills do I need for a remote software developer job?",
    answer: "Key skills include proficiency in remote collaboration tools, strong communication, self-motivation, and expertise in your tech stack (e.g., React, Node.js, Python).",
    time: "2 days ago"
  },
  {
    question: "How can I get started with freelancing in tech?",
    answer: "Build a portfolio, join platforms like Upwork or Fiverr, and start with small projects. Highlight your skills and gather testimonials to grow your freelancing career.",
    time: "3 days ago"
  },
  {
    question: "What are the best resources to learn full stack development?",
    answer: "FreeCodeCamp, The Odin Project, and official docs for React, Node.js, and MongoDB are excellent resources. Practice by building real projects.",
    time: "Last week"
  }
];

export default function LearningHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-10 px-2 md:px-0">
      <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-600 to-pink-500 text-transparent bg-clip-text">Learning History</h1>
        </div>
        <p className="mb-8 text-gray-600 text-lg font-medium">
          Here are your recent interactions with the AI assistant. Use these insights to track your learning journey and revisit helpful answers.
        </p>
        <div className="space-y-6">
          {history.map((item, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow hover:shadow-lg border transition-all">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-gray-800">You asked:</span>
              </div>
              <div className="text-gray-900 text-lg mb-2">{item.question}</div>
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="h-5 w-5 text-pink-400" />
                <span className="font-semibold text-gray-800">AI answered:</span>
              </div>
              <div className="text-gray-700 mb-2">{item.answer}</div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <Clock className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}