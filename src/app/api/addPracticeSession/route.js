import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      tournamentId,
      teamId,
      coach,
      date,
      duration,
      focus,
      status,
      time,
      title,
      venue
    } = body;


    console.log("Received data:", {
      tournamentId,
      teamId,
      coach,
      date,
      duration,
      focus,
      status,
      time,
      title,
      venue
    });
    // Validate required fields
    if (
      !tournamentId ||
      !teamId ||
      !coach ||
      !date ||
      !duration ||
      !focus ||
      !status ||
      !time ||
      !title ||
      !venue
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
   

    // Create new practice record
    const newPractice =  await prisma.practice.create({
      data: {
        tournamentId,
        teamId,
        coach,
        date,
        duration,
        focus,
        status,
        time,
        title,
        venue
      }
    });

    return NextResponse.json(
      {
        message: "Practice session created successfully",
        practice: newPractice
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating practice session:", error);
    return NextResponse.json(
      { error:error },
      { status: 500 }
    );
  }
}
