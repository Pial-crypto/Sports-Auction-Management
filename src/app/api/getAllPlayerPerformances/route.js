import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    console.log('I am req')
  try {
     console.log("The pers")
    const performances = await prisma.playerPerformance.findMany();

   

    return NextResponse.json(
      { performances },
      { status: 200 }
    );
  } catch (error) {
  //  console.error("Error fetching performances:", error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
