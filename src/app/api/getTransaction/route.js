import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Get transaction request is going on");
   
    // Find the user by email
    const transactionList = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    })


    // If user doesn't exist
    if (!transactionList || transactionList.length === 0) {
      return NextResponse.json(
        { error: "No transaction found" },
        { status: 400 }
      );
    }

 
   

    // Return a success response if login is successful
    return NextResponse.json(
      transactionList,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
