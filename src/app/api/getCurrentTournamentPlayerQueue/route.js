import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Get auction player req is going on");
   
    // Find the user by email
    const playerQueue = await prisma.playerRequest.findMany({
      orderBy: { createdAt: "desc" },
    })


    // If user doesn't exist


 
   

    // Return a success response if login is successful
    return NextResponse.json(
      playerQueue,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
