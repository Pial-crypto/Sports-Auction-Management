import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    console.log("Received request to update match");
    const data = await req.json();
    
console.log("Data received for match update:", data);
    

    const updatedMatch = await prisma.match.update({
        where: {
          id: data.id, // Assuming you are updating an existing match
        },
      data: {
        type: data.type|| "",
        venue: data.venue || "",
        date: data.date || "",
       team1Name:data.team1Name     || "",
        team1Id: data.team1Id || "",
        team2Id: data.team2Id || "",
         team2Name:data.team2Name || "",
        tournamentId: data.tournamentId || "",
        status: data.status || "upcoming",
        team1Score:data.team1Score || "0",
        team2Score:data.team2Score || "0",
        currentOver: data.currentOver || "0",
        toralOvers: data.overs || "0",
        currentTime: data.currentTime || "0",
        winner: data.winner || "Not get yet",
      }
    });

    return NextResponse.json(
      { message: "Match updated successfully", match: updatedMatch },
      { status: 201 }
    );
  } catch (error) {
   // console.error("Error updating match:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}