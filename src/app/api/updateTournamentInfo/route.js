import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received request to update tournament info");
    const data = await req.json();

    if (!data.id) {
      return NextResponse.json(
        { error: "Tournament ID is required" },
        { status: 400 }
      );
    }

const updatedTournament = await prisma.tournament.update({
  where: { id: data.id },
  data: data, // only works if data has valid fields for the tournament model
});


    return NextResponse.json(
      { message: "Tournament info updated successfully", tournament: updatedTournament },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating tournament info:", error);
    return NextResponse.json(
      { error: "Failed to update tournament info" },
      { status: 500 }
    );
  }
}
