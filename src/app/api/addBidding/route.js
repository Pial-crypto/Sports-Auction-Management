import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { teamId, playerId, teamName, amount, tournamentId } = body;
    console.log("Received data:", body);

    // Validate required fields
    if (!teamId || !playerId || !teamName || !amount || !tournamentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new bidding record
    const newBidding = await prisma.bidding.create({
      data: {
        teamId,
        playerId,
        teamName,
        amount,
        tournamentId
      }
    });

    return NextResponse.json(
      {
        message: "Bidding added successfully",
        bidding: newBidding
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding bidding:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}