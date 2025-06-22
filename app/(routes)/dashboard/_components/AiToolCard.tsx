"use client";
import React, { useState } from "react";
import Image from "next/image";
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';
import ResumeUploadDialog from "./ResumeUploadDialog";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// ...existing code...

interface TOOL {
  name: string;
  desc: string;
  icon?: string;
  button: string;
  path: string;
}

type AiToolProp = {
  tool: TOOL;
};

export default function AiToolCard({ tool }: AiToolProp) {

  const id = uuidv4();
  const { user } = useUser();
  const router = useRouter();
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const onClickButton = async () => {
    if (tool.name === "AI Resume Analyzer") {
      setOpenResumeDialog(true);
    } else if (tool.path === "/ai-tools/ai-roadmap-agent") {
      setOpenRoadmapDialog(true);
    } else {
      // Only for tools that require navigation
      const result = await axios.post("/api/history", {
        recordId: id,
        content: []
      });
      console.log(result);
      router.push(tool.path + '/' + id);
    }
  };
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex items-center gap-4 mb-4">
        {tool.icon && (
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Image src={tool.icon} alt={tool.name} width={32} height={32} />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.desc}</p>
      <button
        onClick={onClickButton}
        className="w-full bg-[#02386E] text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors"
      >
        {tool.button}
      </button>
      {/* Dialogs */}
      <ResumeUploadDialog
        openResumeUpload={openResumeDialog}
        setOpenResumeDialog={setOpenResumeDialog}
      />
      <RoadmapGeneratorDialog
        openDialog={openRoadmapDialog}
        setOpenDialog={setOpenRoadmapDialog}
      />
    </div>
  );
}

