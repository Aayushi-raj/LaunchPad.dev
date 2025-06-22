import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { projectsTable, projectStatusHistoryTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { status, notes } = body;

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    // Update project status
    const [updatedProject] = await db
      .update(projectsTable)
      .set({
        currentStatus: status,
        updatedAt: new Date(),
      })
      .where(eq(projectsTable.id, parseInt(params.projectId)))
      .returning();

    if (!updatedProject) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Record status change in history
    const [statusHistory] = await db
      .insert(projectStatusHistoryTable)
      .values({
        projectId: parseInt(params.projectId),
        status,
        notes,
      })
      .returning();

    return NextResponse.json({
      project: updatedProject,
      statusHistory,
    });
  } catch (error) {
    console.error("[PROJECT_STATUS_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    // Get status history for the project
    const statusHistory = await db
      .select()
      .from(projectStatusHistoryTable)
      .where(eq(projectStatusHistoryTable.projectId, parseInt(params.projectId)))
      .orderBy(projectStatusHistoryTable.changedAt);

    return NextResponse.json(statusHistory);
  } catch (error) {
    console.error("[PROJECT_STATUS_HISTORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 