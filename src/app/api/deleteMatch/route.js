import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    console.log("Received request to delete match");

    const data = await req.json();
    const matchId = data.id;

    if (!matchId) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    const deletedMatch = await prisma.match.delete({
      where: {
        id: matchId,
      },
    });

    return NextResponse.json(
      { message: "Match deleted successfully", match: deletedMatch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json(
      { error: "Failed to delete match", details: error.message },
      { status: 500 }
    );
  }
}
