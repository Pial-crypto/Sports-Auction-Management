import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req) {
  try {
    // Find all users
    const allUsers = await prisma.user.findMany();

    // If no users exist
    // if (!allUsers || allUsers.length === 0) {
    //   return NextResponse.json(
    //     { error: "No users found" },
    //     { status: 400 }
    //   );
    // }

   
    // Return a success response with users data
    return NextResponse.json(
      {
        message: "Users fetched successfully",
        users: allUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
