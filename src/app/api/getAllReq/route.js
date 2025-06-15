import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
   
    // Find the user by email
    const allPlayerReq = await prisma.playerRequest.findMany();
   

    // If user doesn't exist
    // if (!allPlayerReq) {
    //   return NextResponse.json(
    //     { error: "No req found" },
    //     { status: 400 }
    //   );
    // }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      {
        message:"All req fetched successfully",
        allPlayerReq:allPlayerReq
      },
      { status: 200 }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
