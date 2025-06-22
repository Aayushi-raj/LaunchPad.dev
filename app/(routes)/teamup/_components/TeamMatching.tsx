"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    name: 'Sarah Chen',
    avatar: '/avatars/sarah.jpg',
    skills: ['React', 'Node.js', 'TypeScript'],
    interests: ['Web Development', 'AI/ML', 'Open Source'],
    goals: 'Building scalable web applications',
    matchPercentage: 92
  },
  {
    id: '2',
    name: 'Alex Kumar',
    avatar: '/avatars/alex.jpg',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    interests: ['AI/ML', 'Data Analysis', 'Research'],
    goals: 'Developing AI solutions for healthcare',
    matchPercentage: 85
  },
  // Add more mock profiles as needed
];

export default function TeamMatching() {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleConnect = (profileId: string) => {
    // TODO: Implement connection logic
    console.log('Connecting with profile:', profileId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Suggested Team Members</h2>
        <Button variant="outline">Update Preferences</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>
                  Match: {profile.matchPercentage}%
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Goals</h4>
                  <p className="text-sm text-gray-600">{profile.goals}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleConnect(profile.id)}
              >
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 