import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { tasks } from "@/drizzle/schema/projects";
import { eq } from "drizzle-orm";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { title, description, priority, dueDate } = body;

    if (!title) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const task = await db.insert(tasks).values({
      projectId: parseInt(params.projectId),
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
    }).returning();

    return NextResponse.json(task[0]);
  } catch (error) {
    console.error("[TASKS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const tasksList = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, parseInt(params.projectId)));

    return NextResponse.json(tasksList);
  } catch (error) {
    console.error("[TASKS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { taskId, status } = body;

    if (!taskId || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const task = await db
      .update(tasks)
      .set({
        status,
        completedAt: status === "completed" ? new Date() : null,
      })
      .where(eq(tasks.id, taskId))
      .returning();

    return NextResponse.json(task[0]);
  } catch (error) {
    console.error("[TASKS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 