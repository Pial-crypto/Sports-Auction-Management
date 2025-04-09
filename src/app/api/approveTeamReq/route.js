import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("giveApprovaltoPlayer")
    const body = await req.json();
    const {id} = body;
    console.log(id,"id")
   
    // Find the user by email
    const request = await prisma.teamRequest.update({
      where: { id: id },
      data: {
        approved: true,
        rejected: false,
      }
    });
   // console.log(request,"request")

    // If user doesn't exist
    if (!request) {
      return NextResponse.json(
        { error: "No team found" },
        { status: 400 }
      );
    }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      {
        message:"Team approved successfully",
        request:request
      },
      { status: 200 }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  };
};
