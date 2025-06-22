"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  projects: TeamProject[];
  resources: TeamResource[];
}

interface TeamMember {
  id: number;
  userId: number;
  role: string;
  joinedAt: string;
  isActive: boolean;
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
  };
}

interface TeamProject {
  id: number;
  projectId: number;
  project?: {
    name: string;
    description: string;
    status: string;
  };
}

interface TeamResource {
  id: number;
  name: string;
  description: string;
  type: string;
  url: string;
  createdAt: string;
}

export function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    members: [] as number[],
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const createTeam = async () => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });
      if (response.ok) {
        fetchTeams();
        setNewTeam({
          name: "",
          description: "",
          members: [],
        });
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "member":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Team Name"
                value={newTeam.name}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Team Description"
                value={newTeam.description}
                onChange={(e) =>
                  setNewTeam({ ...newTeam, description: e.target.value })
                }
              />
              <Button onClick={createTeam}>Create Team</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <p className="text-sm text-gray-500">{team.description}</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="members">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                <TabsContent value="members" className="space-y-4">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={member.user?.imageUrl} />
                          <AvatarFallback>
                            {member.user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.user?.name}</p>
                          <p className="text-sm text-gray-500">
                            {member.user?.email}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={getRoleBadgeColor(member.role)}
                      >
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                  {team.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-2 bg-gray-50 rounded"
                    >
                      <h4 className="font-medium">{project.project?.name}</h4>
                      <p className="text-sm text-gray-500">
                        {project.project?.description}
                      </p>
                      <Badge
                        className={`mt-2 ${
                          project.project?.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.project?.status}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="resources" className="space-y-4">
                  {team.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-2 bg-gray-50 rounded"
                    >
                      <h4 className="font-medium">{resource.name}</h4>
                      <p className="text-sm text-gray-500">
                        {resource.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge>{resource.type}</Badge>
                        <span className="text-sm text-gray-500">
                          Added {format(new Date(resource.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 