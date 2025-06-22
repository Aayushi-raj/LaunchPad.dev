import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { userPreferencesTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const preferences = await db
      .select()
      .from(userPreferencesTable)
      .limit(1);

    if (!preferences[0]) {
      // Create default preferences if none exist
      const defaultPreferences = {
        userId: 1, // Assuming a default user ID
        emailNotifications: true,
        pushNotifications: true,
        notificationTypes: {
          project: true,
          team: true,
          task: true,
          comment: true,
        },
        theme: "system",
      };

      const [newPreferences] = await db
        .insert(userPreferencesTable)
        .values(defaultPreferences)
        .returning();

      return NextResponse.json(newPreferences);
    }

    return NextResponse.json(preferences[0]);
  } catch (error) {
    console.error("[PREFERENCES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { emailNotifications, pushNotifications, notificationTypes, theme } = body;

    const [updatedPreferences] = await db
      .update(userPreferencesTable)
      .set({
        emailNotifications,
        pushNotifications,
        notificationTypes,
        theme,
        updatedAt: new Date(),
      })
      .where(eq(userPreferencesTable.userId, 1)) // Assuming a default user ID
      .returning();

    return NextResponse.json(updatedPreferences);
  } catch (error) {
    console.error("[PREFERENCES_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 