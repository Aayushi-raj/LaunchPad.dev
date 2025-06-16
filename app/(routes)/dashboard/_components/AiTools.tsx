import React from "react";
import AiToolCard from "./AiToolCard"; // Adjust path if needed

const aiToolsList = [
  {
    name: "AI Career Q&A Chat",
    desc: "Chat with AI Agent to clarify your career doubts",
    button: "Let's Chat",
    path: "/career-chat"
  },
  {
    name: "AI Resume Analyzer",
    desc: "Get instant feedback and suggestions on your resume",
    button: "Analyze Resume",
    path: "/resume-analyzer"
  },
  {
    name: "Career Roadmap Generator",
    desc: "Get a personalized roadmap for your dream role",
    button: "Generate Roadmap",
    path: "/roadmap"
  },
  {
    name: "TeamUp – Find Your Dev Team",
    desc: "Form or join a project team based on your interests",
    button: "Find Team",
    path: "/teamup"
  }
];

function AiTools() {
  return (
    <div className="mt-7 p-6 bg-white border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Available AI Tools</h2>
      <p className="text-gray-600 mb-6">
        Start building and shape your career with these exclusive AI tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 boarder-t pt-4">
        {aiToolsList.map((tool, index) => (
          <AiToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default AiTools;
