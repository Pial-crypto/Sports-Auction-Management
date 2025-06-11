import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
    // Find all bidding records
    const allBiddings = await prisma.bidding.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
   
    // If no biddings exist
    // if (!allBiddings || allBiddings.length === 0) {
    //   return NextResponse.json(
    //     { error: "No biddings found" },
    //     { status: 404 }
    //   );
    // }

    // Return a success response with biddings data
    return NextResponse.json(
      {
        message: "Biddings fetched successfully",
        biddings: allBiddings
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching biddings:", error);
    return NextResponse.json(
      { error: "Something went wrong" }, 
      { status: 500 }
    );
  }
}