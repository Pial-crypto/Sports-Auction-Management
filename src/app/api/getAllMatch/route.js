import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {

    console.log("Received request to fetch all matches");
    // Fetch all matches
    const allMatch = await prisma.match.findMany({
      orderBy: {
        createdAt: "desc", // Order by creation date, most recent first
      },

      
    });

    console.log('allmatch',allMatch)

    // If no matches found
    if (!allMatch || allMatch.length === 0) {
      return NextResponse.json(
        { error: "No matches found" },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json(
      {
        message: "All matches fetched successfully",
        data: allMatch,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
