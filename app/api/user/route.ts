import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db"; // Make sure this points to your Drizzle db instance
import { usersTable } from "@/configs/schema"; // Update path if needed
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        // Get current user from Clerk
        const user = await currentUser();
        console.log("USER:", user);
        console.log("EMAIL:", user?.primaryEmailAddress?.emailAddress);

        // Unauthorized check
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { error: "Unauthorized or missing email address" },
                { status: 401 }
            );
        }

        const email = user.primaryEmailAddress.emailAddress;

        // Check if user already exists in DB
        const existingUsers = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        console.log("EXISTING USERS:", existingUsers);

        if (existingUsers.length > 0) {
            return NextResponse.json(existingUsers[0]);
        }

        // Insert new user
        const insertedUsers = await db
            .insert(usersTable)
            .values({
                name: user.fullName ?? "", // Fallback to empty string if null
                email: email,
            })
            .returning();

        console.log("INSERTED USER:", insertedUsers[0]);

        return NextResponse.json(insertedUsers[0]);
    } catch (e: any) {
        console.error("API /api/user error:", e);
        return NextResponse.json(
            { error: e.message || "Internal server error" },
            { status: 500 }
        );
    }
}
