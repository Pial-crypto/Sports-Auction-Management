import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Auction status GET request is being processed");

    // Extract query params from URL
    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");

    // Validate input
    if (!tournamentId) {
      return NextResponse.json(
        { error: "tournamentId is required" },
        { status: 400 }
      );
    }

    // Fetch auction status
    const statusRecord = await prisma.tournamentAuctionStatus.findUnique({
      where: {
        tournamentId,
      },
    });

    if (!statusRecord) {
      return NextResponse.json(
        { error: "No status found for this tournament" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, auctionStatus: statusRecord.auctionStatus },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in auction status GET:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
