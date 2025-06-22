"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2Icon, SparkleIcon } from 'lucide-react';
import { v4 } from 'uuid';
import axios from 'axios';
import { Input } from '@/components/ui/input'; // Assuming you have this Input component
import { useRouter } from 'next/navigation';

function RoadmapGeneratorDialog({ openDialog, setOpenDialog }: any) {
    const [userInput, setUserInput] = useState<string>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const GenerateRoadmap = async () => {
        const roadmapId = v4();
        setLoading(true);
        try {
            const result = await axios.post('/api/ai-roadmap-agent', {
                roadmapId: roadmapId,
                userInput: userInput
            });
            console.log(result.data);
            router.push('/ai-tools/ai-roadmap-agent/' + roadmapId)
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter position/skills to generate roadmap</DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-2">
                            <Input
                                placeholder="e.g. full stack developer"
                                onChange={(event) => setUserInput(event?.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button
                        onClick={GenerateRoadmap}
                        disabled={loading || !userInput}
                    >
                        {loading ? (
                            <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                        ) : (
                            <SparkleIcon className="mr-2 h-4 w-4" />
                        )}
                        Generate
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default RoadmapGeneratorDialog;

