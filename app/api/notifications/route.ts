import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { notifications } from "@/drizzle/schema/notifications";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const notificationsList = await db
      .select()
      .from(notifications)
      .orderBy(desc(notifications.createdAt))
      .limit(50);

    return NextResponse.json(notificationsList);
  } catch (error) {
    console.error("[NOTIFICATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { notificationId, isRead } = body;

    if (!notificationId) {
      return new NextResponse("Missing notification ID", { status: 400 });
    }

    const notification = await db
      .update(notifications)
      .set({ isRead })
      .where(eq(notifications.id, notificationId))
      .returning();

    return NextResponse.json(notification[0]);
  } catch (error) {
    console.error("[NOTIFICATIONS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 