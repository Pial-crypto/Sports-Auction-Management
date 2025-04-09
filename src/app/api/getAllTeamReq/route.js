import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
   
    // Find the user by email
    const allTeamReq = await prisma.teamRequest.findMany();
   

    // If user doesn't exist
        if (!allTeamReq) {
      return NextResponse.json(
        { error: "No req found" },
        { status: 400 }
      );
    }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      {
        message:"All req fetched successfully",
            allTeamReq:allTeamReq
      },
      { status: 200 }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
