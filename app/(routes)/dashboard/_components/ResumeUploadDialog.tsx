"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Sparkles, Loader2 as Loader2Icon, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function ResumeUploadDialog({ openResumeUpload, setOpenResumeDialog }: any) {
    const [file, setFile] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);

    const onFileChange = (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setError(null);
        }
    };

    const onUploadAndAnalyze = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);

        try {
            const recordId = uuidv4();
            const formData = new FormData();
            formData.append("recordId", recordId);
            formData.append("resumeFile", file);

            const response = await axios.post("/api/ai-resume-agent", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            let analysisResult = response.data.analysis || response.data.output?.analysis || response.data.output;
            if (!analysisResult) throw new Error("No analysis data received from server");

            setResult(analysisResult);
            setFile(null);
        } catch (error: any) {
            setError(
                error.response?.data?.error ||
                error.message ||
                "Failed to analyze resume. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOpenResumeDialog(false);
        setFile(null);
        setError(null);
        setResult(null);
    };

    return (
        <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
            <DialogContent className="max-w-xl rounded-2xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-indigo-700">
                        <Sparkles className="h-6 w-6 text-indigo-500" />
                        <span className="text-2xl font-bold">AI Resume Analyzer</span>
                    </DialogTitle>
                    <DialogDescription>
                        <span className="text-gray-600">
                            Upload your resume to receive detailed, AI-powered feedback and actionable suggestions.
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* File Upload Area */}
                    {!result && (
                        <div>
                            <label
                                htmlFor="resumeUpload"
                                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-200 rounded-xl bg-white hover:bg-indigo-50 hover:border-indigo-400 transition-colors gap-3 cursor-pointer shadow-sm"
                            >
                                <File className="h-12 w-12 text-indigo-300" />
                                <span className="text-base font-medium text-indigo-700">
                                    Click to select your resume
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    PDF files only, max 10MB
                                </span>
                            </label>
                            <input
                                type="file"
                                id="resumeUpload"
                                accept=".pdf"
                                className="hidden"
                                onChange={onFileChange}
                            />

                            {file && (
                                <div className="mt-4 flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
                                    <File className="h-5 w-5 text-indigo-600" />
                                    <span className="text-sm font-semibold text-indigo-900">
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-indigo-500">
                                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg shadow">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow">
                            <Loader2Icon className="animate-spin h-6 w-6 text-blue-600" />
                            <div>
                                <p className="text-base font-semibold text-blue-800">
                                    Analyzing your resume...
                                </p>
                                <p className="text-xs text-blue-600">
                                    This may take 30-60 seconds.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Result Display */}
                    {result && (
                        <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="h-6 w-6 text-indigo-600" />
                                <span className="text-xl font-bold text-indigo-700">Resume Analysis Report</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-extrabold text-green-700">{result.overall_score}</span>
                                    <span className="text-lg text-gray-700">/ 100</span>
                                </div>
                                <div className="rounded-full bg-green-100 px-3 py-1 text-green-800 font-medium">
                                    {result.overall_feedback}
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className="block text-gray-700 text-base mb-1 font-semibold">Summary</span>
                                <span className="text-gray-600">{result.summary_comment}</span>
                            </div>
                            <div>
                                <span className="block text-gray-700 font-semibold mb-1">Section Scores</span>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <li className="flex items-center gap-2 bg-indigo-50 rounded px-2 py-1">
                                        <File className="h-4 w-4 text-indigo-400" />
                                        <span className="font-medium">Contact Info:</span>
                                        <span className="text-indigo-700 font-bold">{result.sections?.contact_info?.score}</span>
                                        <span className="text-xs text-gray-500">{result.sections?.contact_info?.comment}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-indigo-50 rounded px-2 py-1">
                                        <File className="h-4 w-4 text-indigo-400" />
                                        <span className="font-medium">Experience:</span>
                                        <span className="text-indigo-700 font-bold">{result.sections?.experience?.score}</span>
                                        <span className="text-xs text-gray-500">{result.sections?.experience?.comment}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-indigo-50 rounded px-2 py-1">
                                        <File className="h-4 w-4 text-indigo-400" />
                                        <span className="font-medium">Education:</span>
                                        <span className="text-indigo-700 font-bold">{result.sections?.education?.score}</span>
                                        <span className="text-xs text-gray-500">{result.sections?.education?.comment}</span>
                                    </li>
                                    <li className="flex items-center gap-2 bg-indigo-50 rounded px-2 py-1">
                                        <File className="h-4 w-4 text-indigo-400" />
                                        <span className="font-medium">Skills:</span>
                                        <span className="text-indigo-700 font-bold">{result.sections?.skills?.score}</span>
                                        <span className="text-xs text-gray-500">{result.sections?.skills?.comment}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <span className="block text-blue-700 font-semibold mb-1">Tips for Improvement</span>
                                <ul className="list-disc ml-6 text-blue-800">
                                    {result.tips_for_improvement?.map((tip: string, idx: number) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="block text-green-700 font-semibold mb-1">What's Good</span>
                                <ul className="list-disc ml-6 text-green-800">
                                    {result.whats_good?.map((good: string, idx: number) => (
                                        <li key={idx}>{good}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="block text-red-700 font-semibold mb-1">Needs Improvement</span>
                                <ul className="list-disc ml-6 text-red-800">
                                    {result.needs_improvement?.map((bad: string, idx: number) => (
                                        <li key={idx}>{bad}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                        className="rounded-lg border-indigo-200"
                    >
                        {result ? "Close" : "Cancel"}
                    </Button>
                    {!result && (
                        <Button
                            onClick={onUploadAndAnalyze}
                            disabled={!file || isLoading}
                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold shadow"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2Icon className="animate-spin h-4 w-4" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Analyze Resume
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ResumeUploadDialog;
