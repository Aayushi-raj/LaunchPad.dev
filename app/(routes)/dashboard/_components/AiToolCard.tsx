// import React from "react";
// import Image from "next/image";

// interface TOOL {
//     name: string;
//     desc: string;
//     icon: string;
//     button: string;
//     path: string;
// }

// type AiToolProp = {
//     tool: TOOL
// }
// function AiToolCard({ tool }: AiToolProp) {
//     return (
//         <div className="p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
//             <Image src={tool.icon} alt={tool.name} width={40} height={40} />
//             <h3 className="font-semibold">{tool.name}</h3>
//             <p className="text-sm text-gray-600">{tool.desc}</p>
//             <a href={tool.path} className="text-blue-500 hover:underline">
//                 <button className="w-full mt-3 bg-[#00264D] text-white py-2 rounded-md">{tool.button}</button>
//             </a>

//         </div>
//     );
// }

// export default AiToolCard;


import Image from "next/image";
import React from "react";

type AiToolProp = {
  tool: {
    icon: string;
    name: string;
    desc: string;
    path: string;
    button: string;
  };
};

export default function AiToolCard({ tool }: AiToolProp) {
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Image src={tool.icon} alt={tool.name} width={32} height={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.desc}</p>
      <a href={tool.path} className="mt-auto block">
        <button className="w-full bg-[#02386E] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors">
          {tool.button}
        </button>
      </a>
    </div>
  );
}

