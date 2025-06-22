import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { teams, teamMembers } from "@/drizzle/schema/teams";
import { eq, inArray } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, members } = body;

    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create team
    const team = await db.insert(teams).values({
      name,
      description,
      createdById: userId,
    }).returning();

    // Add creator as admin
    await db.insert(teamMembers).values({
      teamId: team[0].id,
      userId: userId,
      role: "admin",
    });

    // Add other members if provided
    if (members && Array.isArray(members)) {
      await db.insert(teamMembers).values(
        members.map((memberId: number) => ({
          teamId: team[0].id,
          userId: memberId,
          role: "member",
        }))
      );
    }

    return NextResponse.json(team[0]);
  } catch (error) {
    console.error("[TEAMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Get teams where user is a member
    const userTeamMemberships = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.userId, userId));
    const teamIds = userTeamMemberships.map((m) => m.teamId);
    let userTeams: any[] = [];
    if (teamIds.length > 0) {
      userTeams = await db
        .select()
        .from(teams)
        .where(inArray(teams.id, teamIds));
    }

    return NextResponse.json(userTeams);
  } catch (error) {
    console.error("[TEAMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 