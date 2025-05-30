import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const practices = await prisma.practice.findMany({
      orderBy: {
        createdAt: "desc", // Optional: sort by date
      },
    });

    return NextResponse.json(
      { message: "Practice sessions fetched successfully", practices },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching practice sessions:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching practice sessions" },
      { status: 500 }
    );
  }
}
