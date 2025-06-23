import React from "react";
import AiToolCard from "./AiToolCard"; // Adjust path if needed

const aiToolsList = [
  {
    name: "AI Career Q&A Chat",
    desc: "Chat with AI Agent to clarify your career doubts",
    icon: '/chat-bot.png',
    button: "Let's Chat",
    path: "/career-chat"
  },
  {
    name: "AI Resume Analyzer",
    desc: "Get instant feedback and suggestions on your resume",
    icon: '/headhunting.png',
    button: "Analyze Resume",
    path: "/ai-tools/ai-resume-analyzer"
  },
  {
    name: "Career Roadmap Generator",
    desc: "Get a personalized roadmap for your dream role",
    icon:'/roadmap.png',
    button: "Generate Roadmap",
    path: "/ai-tools/ai-roadmap-agent"
  },
  {
    name: "TeamUp – Find Your Dev Team",
    desc: "Form or join a project team based on your interests",
    icon: '/handshake.png',
    button: "Find Team",
    path: "/teamup"
  }
];

// function AiTools() {
//   return (
//     <div className="mt-7 p-6 bg-white border rounded-xl shadow-sm">
//       <h2 className="text-2xl font-bold mb-2 text-gray-800">Available AI Tools</h2>
//       <p className="text-gray-600 mb-6">
//         Start building and shape your career with these exclusive AI tools.
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 boarder-t pt-4">
//         {aiToolsList.map((tool, index) => (
//           <AiToolCard key={index} tool={tool} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AiTools;



function AiTools() {
  return (
    <div className="mt-10 px-6 py-8 bg-white border rounded-2xl shadow-sm">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Available AI Tools</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Start building and shape your career with these exclusive AI tools. From mentorship to matchmaking, we've got your growth covered.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiToolsList.map((tool, index) => (
          <AiToolCard key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default AiTools;


