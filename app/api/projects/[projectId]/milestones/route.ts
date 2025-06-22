import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { milestones } from "@/drizzle/schema/projects";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { title, description, dueDate } = body;

    if (!title || !dueDate) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const milestone = await db.insert(milestones).values({
      projectId: parseInt(params.projectId),
      title,
      description,
      dueDate: new Date(dueDate),
    }).returning();

    return NextResponse.json(milestone[0]);
  } catch (error) {
    console.error("[MILESTONES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const milestonesList = await db
      .select()
      .from(milestones)
      .where(eq(milestones.projectId, parseInt(params.projectId)));

    return NextResponse.json(milestonesList);
  } catch (error) {
    console.error("[MILESTONES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { milestoneId, completed } = body;

    if (!milestoneId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const milestone = await db
      .update(milestones)
      .set({
        completedAt: completed ? new Date() : null,
      })
      .where(eq(milestones.id, milestoneId))
      .returning();

    return NextResponse.json(milestone[0]);
  } catch (error) {
    console.error("[MILESTONES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 