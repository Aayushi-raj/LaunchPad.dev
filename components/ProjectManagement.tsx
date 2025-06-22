"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { ProjectStatusDialog } from "./ProjectStatusDialog";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  currentStatus: string;
  tasks: Task[];
  milestones: Milestone[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  completedAt: string | null;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completedAt: string | null;
}

export function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const createProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        fetchProjects();
        setNewProject({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const calculateProgress = (project: Project) => {
    if (!project.tasks.length) return 0;
    const completedTasks = project.tasks.filter(
      (task) => task.status === "completed"
    ).length;
    return (completedTasks / project.tasks.length) * 100;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) =>
                      setNewProject({ ...newProject, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) =>
                      setNewProject({ ...newProject, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button onClick={createProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{project.name}</CardTitle>
                <ProjectStatusDialog
                  projectId={project.id}
                  currentStatus={project.currentStatus}
                  onStatusUpdate={fetchProjects}
                />
              </div>
              <div className="text-sm text-gray-500">
                {format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                {project.endDate
                  ? format(new Date(project.endDate), "MMM d, yyyy")
                  : "No end date"}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round(calculateProgress(project))}%</span>
                  </div>
                  <Progress value={calculateProgress(project)} />
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600">{project.description}</p>
                )}
                <div className="space-y-2">
                  <h3 className="font-medium">Tasks ({project.tasks.length})</h3>
                  <div className="space-y-1">
                    {project.tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="text-sm flex items-center justify-between"
                      >
                        <span>{task.title}</span>
                        <ProjectStatusBadge status={task.status} />
                      </div>
                    ))}
                    {project.tasks.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{project.tasks.length - 3} more tasks
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 