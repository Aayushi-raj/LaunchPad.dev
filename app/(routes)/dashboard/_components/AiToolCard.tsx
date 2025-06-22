"use client";
import React, { useState } from "react";
import Image from "next/image";
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';

interface TOOL {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}

type AiToolProp = {
  tool: TOOL;
};

export default function AiToolCard({ tool }: AiToolProp) {
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);

  const onClickButton = () => {
    if (tool.path === '/ai-tools/ai-roadmap-agent') {
      setOpenRoadmapDialog(true);
    } else {
      window.location.href = tool.path;
    }
  };

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Image src={tool.icon} alt={tool.name} width={32} height={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.desc}</p>
      <button
        onClick={onClickButton}
        className="w-full bg-[#02386E] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
      >
        {tool.button}
      </button>
      <RoadmapGeneratorDialog
        openDialog={openRoadmapDialog}
        setOpenDialog={setOpenRoadmapDialog}
      />
    </div>
  );
}
