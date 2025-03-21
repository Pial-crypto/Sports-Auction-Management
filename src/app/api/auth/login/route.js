import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Login request is going on");
    const body = await req.json();
    const { email, password } = body;

    // Find the user by email
    const user = await prisma.user.findUnique({
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

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is incorrect
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Wrong password" },
        { status: 400 }
      );
    }

    // Return a success response if login is successful
    return NextResponse.json(
      { message: "Login successful", user: { name: user.name, email: user.email, role: user.role } },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
