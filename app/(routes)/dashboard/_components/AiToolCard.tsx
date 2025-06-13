import React from "react";
interface TOOL {
    name: string;
    desc: string;
    button: string;
    path: string;
}

type AiToolProp = {
    tool: TOOL
}
function AiToolCard({ tool }: AiToolProp) {
    return (
        <div className="p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.desc}</p>
            <a href={tool.path} className="text-blue-500 hover:underline">
                <button className="w-full mt-3 bg-[#00264D] text-white py-2 rounded-md">{tool.button}</button>
            </a>

        </div>
    );
}

export default AiToolCard;
