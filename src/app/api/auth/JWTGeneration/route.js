import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'; // Assuming you are using Next.js 13+ with API routes

export async function POST(req) {
    console.log("Req is going on")
     const body = await req.json();
    const { email, password } = body;

  // Ensure email is provided
  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  // Generate JWT token
  try {
    console.log(process.env.JWT_SECRET,"Pppppp0pp")
    const token = jwt.sign({ email }, process.env.JWT_SECRET , {
      expiresIn: '7d', // Token expiration time
    });

    return NextResponse.json(
      { message: "Successfully JWT generated", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating JWT token", error: error.message },
      { status: 500 }
    );
  }
}
