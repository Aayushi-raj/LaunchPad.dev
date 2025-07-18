'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RoadmapCanvas from '../_components/RoadmapCanvas';

function RoadmapGeneratorAgent() {
    const { roadmapid } = useParams();
    const [roadMapDetail, setRoadMapDetail] = useState<any>();

    useEffect(() => {
        roadmapid && GetRoadmapDetails();
    }, [roadmapid]);

    const GetRoadmapDetails = async () => {
        try {
            const result = await axios.get(`/api/history?recordId=${roadmapid}`);
            const raw = result.data?.content;

            if (!raw) {
                console.warn("No content found in result");
                return;
            }

            // Only parse if content starts with json
            if (raw.startsWith("json")) {
                const cleaned = raw.replace(/^json\n/, "").replace(/\n$/, "");

                try {
                    const parsed = JSON.parse(cleaned);
                    console.log("Parsed roadmap data:", parsed);
                    setRoadMapDetail(parsed);
                } catch (parseErr) {
                    console.error("Failed to parse cleaned JSON content:", cleaned);
                }
            } else {
                console.warn("Unexpected content format:", raw);
            }
        } catch (error) {
            console.error("Error fetching roadmap details:", error);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='border rounded-xl p-5'>
                <h3 className='font-semibold text-lg mb-4'>Details</h3>
                
                <h2 className='font-bold text-2xl'>{roadMapDetail?.roadmapTitle}</h2>
                <p className='mt-3 text-gray-400'>Description: {roadMapDetail?.description}</p>
                <h2 className='mt-5 font-medium text-blue-600'>Duration: {roadMapDetail?.duration}</h2>
                <Button className='mt-5 w-full'>+ Create Another Roadmap</Button>
            </div>
            <div className='md:col-span-2'>
                <h3 className='font-semibold text-lg mb-4'>Roadmap</h3>
                <RoadmapCanvas initialNodes={roadMapDetail?.initialNodes} initialEdges={roadMapDetail?.initialEdges} />
            </div>
        </div>
    );
}

export default RoadmapGeneratorAgent;
