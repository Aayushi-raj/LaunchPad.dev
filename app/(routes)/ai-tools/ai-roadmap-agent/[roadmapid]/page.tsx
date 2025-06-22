'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RoadmapCanvas from '../_components/RoadmapCanvas'
function RoadmapGeneratorAgent() {

    const { roadmapid } = useParams();
    const [roadMapDetail, setRoadMapDetail] = useState<any>();
    useEffect(
        () => {
            roadmapid && GetRoadmapDetails();
        }, [roadmapid]
    )
<<<<<<< HEAD
    const GetRoadmapDetails = async () => {
        try {
            const result = await axios.get(`/api/history?recordId=${roadmapid}`);
            console.log(result.data);
            setRoadMapDetail(result.data?.content);
        } catch (error) {
            console.error("Error fetching roadmap details:", error);
        }
    }

=======
   const GetRoadmapDetails = async () => {
  try {
    const result = await axios.get(`/api/history?recordId=${roadmapid}`);
    const raw = result.data?.content;

    if (!raw) {
      console.warn("No content found in result");
      return;
    }

    // Only parse if content starts with ```json
    if (raw.startsWith("```json")) {
      const cleaned = raw.replace(/^```json\n/, "").replace(/\n```$/, "");

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



>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='border rounded-xl p-5'>
                DEtails
<<<<<<< HEAD
=======
                
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
                <h2 className='font-bold text-2xl'>{roadMapDetail?.roadmapTitle}</h2>
                <p className='mt-3 text-gray-400'>description:{roadMapDetail?.description}</p>
                <h2 className='mt-5 font-medium text-blue-600'> duration:{roadMapDetail?.duration}</h2>
                <Button className='mt-5 w-full'>+create another roadmap</Button>
            </div>
            <div className='md:grid-cols-2'>
                roadmap
                <RoadmapCanvas initialNodes={roadMapDetail?.initialNodes} initialEdges={roadMapDetail?.initialEdges} />
            </div>
        </div>
    );
}

export default RoadmapGeneratorAgent;
