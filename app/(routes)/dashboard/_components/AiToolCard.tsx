"use client";
import React, { useState } from "react";
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog';

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
    const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);

    const onClickButton = () => {
        if (tool.path === '/ai-tools/ai-roadmap-agent') {
            setOpenRoadmapDialog(true);
        } else {
            window.location.href = tool.path; // optionally navigate if not a dialog
        }
    };

    return (
        <div className="p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.desc}</p>

            <button
                onClick={onClickButton}
                className="w-full mt-3 bg-[#00264D] text-white py-2 rounded-md"
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

export default AiToolCard;
