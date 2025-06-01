import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received request to update match");
    const data = await req.json();

    console.log("Data received for match update:", data);

    // Remove fields not in schema
    delete data.createdAt;
    delete data.manOfTheMatch;
    delete data.totalPoints;

// POST ফাংশনে শুধু `match` মডেলের ফিল্ডগুলা পাঠান
const updatedMatch = await prisma.match.update({
  where: {
    id: data.id,
  },
  data: {
    type: data.type || "",
    venue: data.venue || "",
    date: data.date || "",
    team1Name: data.team1Name || "",
    team1Id: data.team1Id || "",
    team2Id: data.team2Id || "",
    team2Name: data.team2Name || "",
    tournamentId: data.tournamentId || "",
    status: data.status || "upcoming",
    team1Score: data.team1Score || "0",
    team2Score: data.team2Score || "0",
    currentOver: data.currentOver || "0",
    toralOvers: data.toralOvers || "0",  // 🔄 spelling ঠিক আছে তো?
    currentTime: data.currentTime || "0",
    winner: data.winner || "Not get yet",
    team1Points: data.team1Points || "0",
    team2Points: data.team2Points || "0",
    manOfTheMatchId: data.manOfTheMatchId || "none",
    manOfTheMatchName: data.manOfTheMatchName || "none",
  },
});


    return NextResponse.json(
      { message: "Match updated successfully", match: updatedMatch },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
