import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Auction status request is being processed");

    const body = await req.json();
    const { tournamentId } = body;

    // Validate input
    if (!tournamentId) {
      return NextResponse.json(
        { error: "tournamentId is required" },
        { status: 400 }
      );
    }

    // Always create new auction status entry with status "true" (as string)
    await prisma.tournamentAuctionStatus.create({
      data: {
        tournamentId,
        auctionStatus: "finished", // stored as string
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error("Error in auction status POST:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
