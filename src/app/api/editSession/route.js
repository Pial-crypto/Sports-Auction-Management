import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, ...updatedFields } = body;

    console.log("Received data for update:", body);

    if (!id) {
      return NextResponse.json(
        { error: "Missing practice session ID" },
        { status: 400 }
      );
    }

    // ✅ Only allow valid model fields
    const allowedFields = [
      "tournamentId",
      "teamId",
      "coach",
      "date",
      "duration",
      "focus",
      "status",
      "time",
      "title",
      "venue"
    ];

    const cleanFields = Object.fromEntries(
      Object.entries(updatedFields).filter(([key]) => allowedFields.includes(key))
    );

    const updatedSession = await prisma.practice.update({
      where: { id },
      data: cleanFields,
    });

    return NextResponse.json(
      {
        message: "Practice session updated successfully",
        practice: updatedSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating practice session:", error);
    return NextResponse.json(
      { error: "Something went wrong during update", details: error.message },
      { status: 500 }
    );
  }
}
