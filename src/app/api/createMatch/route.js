import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    console.log("Received request to create match");
    const data = await req.json();
    

    

    const newMatch = await prisma.match.create({
      data: {
        type: data.type,
        venue: data.venue,
        date: data.date,
       team1Name:data.team1Name,
        team1Id: data.team1Id,
        team2Id: data.team2Id,
         team2Name:data.team2Name,
        tournamentId: data.tournamentId,
        status: data.status || "upcoming",
     
      }
    });

    return NextResponse.json(
      { message: "Match created successfully", match: newMatch },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      { error: "Failed to create match" },
      { status: 500 }
    );
  }
}