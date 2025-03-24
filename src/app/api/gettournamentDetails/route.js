import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Tournament info  request is going on");
    const body = await req.json();
    const {id} = body;

    // Find the user by email
    const user = await prisma.tournament.findUnique({
      where: { email },
    });
    console.log(user,"user")

    // If user doesn't exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      user,
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
