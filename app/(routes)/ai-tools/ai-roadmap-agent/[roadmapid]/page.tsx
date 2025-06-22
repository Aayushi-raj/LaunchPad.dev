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
    const GetRoadmapDetails = async () => {
        try {
            const result = await axios.get(`/api/history?recordId=${roadmapid}`);
            console.log(result.data);
            setRoadMapDetail(result.data?.content);
        } catch (error) {
            console.error("Error fetching roadmap details:", error);
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='border rounded-xl p-5'>
                DEtails
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
