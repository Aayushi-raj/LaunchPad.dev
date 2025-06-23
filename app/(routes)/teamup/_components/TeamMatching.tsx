"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  interests: string[];
  goals: string;
  matchPercentage: number;
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Aayushi Raj',
    avatar: '/avatars/sarah.jpg',
    skills: ['React', 'Node.js', 'TypeScript'],
    interests: ['Web Development', 'AI/ML', 'Open Source'],
    goals: 'Building scalable web applications',
    matchPercentage: 92
  },
  {
    id: '2',
    name: 'Tamanna Kapoor',
    avatar: '/avatars/alex.jpg',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    interests: ['AI/ML', 'Data Analysis', 'Research'],
    goals: 'Developing AI solutions for healthcare',
    matchPercentage: 85
  },
  {
    id: '3',
    name: 'Arusha Habib',
    avatar: '/avatars/emily.jpg',
    skills: ['UI/UX', 'Figma', 'CSS'],
    interests: ['Design', 'Accessibility', 'Startups'],
    goals: 'Designing user-centric products',
    matchPercentage: 78
  },
  {
    id: '4',
    name: 'Karnika Arora',
    avatar: '/avatars/mohammed.jpg',
    skills: ['Go', 'Kubernetes', 'Cloud'],
    interests: ['DevOps', 'Cloud', 'Microservices'],
    goals: 'Scaling cloud infrastructure',
    matchPercentage: 88
  },
  {
    id: '5',
    name: 'Sharvari Patil',
    avatar: '/avatars/priya.jpg',
    skills: ['Java', 'Spring', 'APIs'],
    interests: ['Backend', 'APIs', 'Fintech'],
    goals: 'Building robust APIs for fintech',
    matchPercentage: 81
  },
];

const linkedInLinks: Record<string, string> = {
  '1': 'https://www.linkedin.com/in/aayushi-raj-7aa67b28a/',
  '2': 'https://www.linkedin.com/in/kapoortamanna/',
  '3': 'https://www.linkedin.com/in/arusha-habib-18539328b/',
  '4': 'https://www.linkedin.com/in/karnika-arora-932426205/',
  '5': 'https://www.linkedin.com/in/sharvari-patil-a39a19266/',
};

export default function TeamMatching() {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleConnect = (profileId: string) => {
    setShowCongrats(true);
  };

  return (
    <>
      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle>🎉 Congratulations!</DialogTitle>
          </DialogHeader>
          <div className="text-lg font-semibold mb-2">Now you guys are friends!</div>
          <Button onClick={() => setShowCongrats(false)} className="mt-2 w-full">Close</Button>
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Suggested Team Members</h2>
          <Button variant="outline">Update Preferences</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-2xl transition-shadow border-0 bg-gradient-to-br from-white via-blue-50 to-pink-50">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Match:</span>
                      <div className="relative w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-700" 
                          style={{ width: `${profile.matchPercentage}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-blue-600">{profile.matchPercentage}%</span>
                    </div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} className="bg-gradient-to-tr from-blue-200 to-pink-200 text-blue-900 shadow" variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} className="bg-gradient-to-tr from-pink-100 to-blue-100 text-pink-700 border-pink-200 shadow" variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Goals</h4>
                    <p className="text-sm text-gray-600">{profile.goals}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="w-full" onClick={() => handleConnect(profile.id)}>
                  Connect
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.open(linkedInLinks[profile.id], '_blank', 'noopener,noreferrer')}>
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
} 