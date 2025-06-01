import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("body", body);

    const {
      tournamentId,
      teamId,
      playerId,
      matchId,
      ballsFaced,
      overs,
      runsScored,
      wickets,
      goals,
      assists,
      cards,
    } = body;

    // Validate required fields
    if (!playerId || !matchId) {
      return NextResponse.json(
        { error: "Missing required fields: playerId and matchId are required" },
        { status: 400 }
      );
    }

    // Check if performance already exists
    const existingPerformance = await prisma.playerPerformance.findFirst({
      where: {
        playerId,
        matchId,
      },
    });

    let performance;

    if (existingPerformance) {
      // Update the existing record
      performance = await prisma.playerPerformance.update({
        where: { id: existingPerformance.id },
        data: {
          tournamentId: tournamentId || "default-tournament",
          teamId: teamId || "default-team",
          ballsFaced: ballsFaced ? parseInt(ballsFaced) : 0,
          overs: overs ? parseInt(overs) : 0,
          runsScored: runsScored ? parseInt(runsScored) : 0,
          wickets: wickets ? parseInt(wickets) : 0,
          goals: goals ? parseInt(goals) : 0,
          assists: assists ? parseInt(assists) : 0,
          cards: cards || "none",
        },
      });
    } else {
      // Create a new record
      performance = await prisma.playerPerformance.create({
        data: {
          tournamentId: tournamentId || "default-tournament",
          teamId: teamId || "default-team",
          playerId,
          matchId,
          ballsFaced: ballsFaced ? parseInt(ballsFaced) : 0,
          overs: overs ? parseInt(overs) : 0,
          runsScored: runsScored ? parseInt(runsScored) : 0,
          wickets: wickets ? parseInt(wickets) : 0,
          goals: goals ? parseInt(goals) : 0,
          assists: assists ? parseInt(assists) : 0,
          cards: cards || "none",
        },
      });
    }

    return NextResponse.json(
      {
        message: existingPerformance
          ? "Performance record updated successfully"
          : "Performance record created successfully",
        performance,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving performance record:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
