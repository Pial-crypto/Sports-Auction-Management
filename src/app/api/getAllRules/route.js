import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
   
    // Find the user by email
    const rules = await prisma.rules.findMany();
   

    // If user doesn't exist
    if (!rules) {
      return NextResponse.json(
        { error: "No rules found" },
        { status: 400 }
      );
    }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      rules,
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
