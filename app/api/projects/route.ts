import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { projects, tasks, milestones } from "@/drizzle/schema/projects";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, startDate, endDate } = body;

    if (!name || !startDate) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // If userId is present, associate project with user; else, allow guest project creation (optional)
    const project = await db.insert(projects).values({
      name,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    }).returning();

    return NextResponse.json(project[0]);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    let projectsList: any[];
    // For guests, return all public projects or an empty array
    projectsList = [];
    return NextResponse.json(projectsList);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 