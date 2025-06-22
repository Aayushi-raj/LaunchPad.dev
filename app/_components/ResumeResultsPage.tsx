"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Simple Progress bar component (adjust path if needed)
const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${value}%`, height: '100%' }}
        />
    </div>
);

import {
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Download,
    ArrowLeft,
    User,
    Briefcase,
    GraduationCap,
    Wrench
} from 'lucide-react';

interface ResumeAnalysis {
    overall_score: number;
    overall_feedback: string;
    summary_comment: string;
    sections: {
        contact_info: { score: number; comment: string };
        experience: { score: number; comment: string };
        education: { score: number; comment: string };
        skills: { score: number; comment: string };
    };
    tips_for_improvement: string[];
    whats_good: string[];
    needs_improvement: string[];
}

export default function ResumeResultsPage() {
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Try to get data from URL params first, then sessionStorage
        const dataParam = searchParams.get('data');

        if (dataParam) {
            try {
                const decodedData = JSON.parse(decodeURIComponent(dataParam));
                setAnalysis(decodedData);
                setLoading(false);
            } catch (err) {
                setError('Failed to parse analysis data from URL');
                setLoading(false);
            }
        } else {
            // Fallback to sessionStorage
            const storedData = sessionStorage.getItem('resumeAnalysis');
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    setAnalysis(parsedData);
                    setLoading(false);
                    // Clear from sessionStorage after use
                    sessionStorage.removeItem('resumeAnalysis');
                } catch (err) {
                    setError('Failed to parse stored analysis data');
                    setLoading(false);
                }
            } else {
                setError('No analysis data found');
                setLoading(false);
            }
        }
    }, [searchParams]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBadgeVariant = (score: number) => {
        if (score >= 80) return 'default';
        if (score >= 60) return 'secondary';
        return 'destructive';
    };

    const sectionIcons = {
        contact_info: User,
        experience: Briefcase,
        education: GraduationCap,
        skills: Wrench
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Analysis Not Found</h2>
                        <p className="text-gray-600 mb-4">{error || 'No analysis data available'}</p>
                        <Button onClick={() => router.push('/dashboard')} className="w-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Go Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-bold text-gray-900">Resume Analysis Results</h1>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>

                {/* Overall Score Card */}
                <Card className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <TrendingUp className="h-6 w-6" />
                            Overall Resume Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-4xl font-bold">{analysis.overall_score}/100</div>
                            <Badge
                                variant={getScoreBadgeVariant(analysis.overall_score)}
                                className="text-lg px-4 py-2"
                            >
                                {analysis.overall_score >= 80 ? 'Excellent' :
                                    analysis.overall_score >= 60 ? 'Good' : 'Needs Work'}
                            </Badge>
                        </div>
                        <Progress value={analysis.overall_score} className="mb-4 h-3" />
                        <p className="text-lg opacity-90">{analysis.overall_feedback}</p>
                    </CardContent>
                </Card>

                {/* Summary */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 leading-relaxed">{analysis.summary_comment}</p>
                    </CardContent>
                </Card>

                {/* Section Scores */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {Object.entries(analysis.sections).map(([section, data]) => {
                        const IconComponent = sectionIcons[section as keyof typeof sectionIcons];
                        return (
                            <Card key={section} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 capitalize">
                                        <IconComponent className="h-5 w-5 text-indigo-600" />
                                        {section.replace('_', ' ')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                                            {data.score}/100
                                        </span>
                                        <Badge variant={getScoreBadgeVariant(data.score)}>
                                            {data.score >= 80 ? 'Strong' :
                                                data.score >= 60 ? 'Average' : 'Weak'}
                                        </Badge>
                                    </div>
                                    <Progress value={data.score} className="mb-3 h-2" />
                                    <p className="text-sm text-gray-600">{data.comment}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Strengths and Improvements */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* What's Good */}
                    <Card className="border-green-200 bg-green-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-700">
                                <CheckCircle className="h-5 w-5" />
                                Strengths
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {analysis.whats_good.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-green-800">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Needs Improvement */}
                    <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-700">
                                <AlertCircle className="h-5 w-5" />
                                Areas for Improvement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {analysis.needs_improvement.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-red-800">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Tips for Improvement */}
                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                            <TrendingUp className="h-5 w-5" />
                            Actionable Tips for Improvement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {analysis.tips_for_improvement.map((tip, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-blue-800">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    <Button onClick={() => router.push('/dashboard')} variant="outline" size="lg">
                        Back to Dashboard
                    </Button>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download Full Report
                    </Button>
                </div>
            </div>
        </div>
    );
}
