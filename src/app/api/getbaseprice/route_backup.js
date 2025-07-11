import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
    // Find all auctions
    const allbaseprice = await prisma.player.findMany();
   
    // If no auctions exist
    // if (!allAuctions || allAuctions.length === 0) {
    //   return NextResponse.json(
    //     { error: "No auctions found" },
    //     { status: 400 }
    //   );
    // }

    // Return a success response with auctions data
    return NextResponse.json(
      {
        message: "base price fetched successfully",
       allbaseprice: allbaseprice
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}