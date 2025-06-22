import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { userActivities } from "@/drizzle/schema/notifications";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const entityType = url.searchParams.get("entityType");
    const entityId = url.searchParams.get("entityId");

    let query = db
      .select()
      .from(userActivities)
      .orderBy(desc(userActivities.createdAt))
      .limit(50);

    if (entityType && entityId) {
      query = db
        .select()
        .from(userActivities)
        .where(
          eq(userActivities.entityType, entityType) &&
          eq(userActivities.entityId, parseInt(entityId))
        )
        .orderBy(desc(userActivities.createdAt))
        .limit(50);
    }

    const activities = await query;
    return NextResponse.json(activities);
  } catch (error) {
    console.error("[ACTIVITIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, action, entityType, entityId, metadata } = body;

    if (!type || !action || !entityType || !entityId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const activity = await db.insert(userActivities).values({
      type,
      action,
      entityType,
      entityId,
      metadata,
    }).returning();

    return NextResponse.json(activity[0]);
  } catch (error) {
    console.error("[ACTIVITIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 