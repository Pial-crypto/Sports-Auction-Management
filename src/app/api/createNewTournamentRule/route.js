import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Request is going on");

    const body = await req.json();
    console.log(body);

    const { title, description, category, tournamentId } = body;

    // console.log(tournamentId, "tournamentId");
    // console.log(category, "category");
    // console.log(title, "title");
    // console.log(description, "description");

    // Ensure the data contains the necessary fields
    if (!title || !description || !category || !tournamentId) {
      return NextResponse.json(
        { error: "All fields (title, description, category, tournamentId) are required" },
        { status: 400 }
      );
    }

  //  Create a rule without relation
   console.log(prisma.rules.create,"prisma.rules.create")
    const rule = await prisma.rules.create({
      data: {
        title:title||"",
        description:description||"",
        category:category||"",
        tournamentId:tournamentId||"",  // Just insert the tournamentId as a field
      },
    });

    console.log("Created Rule:",rule);

    return NextResponse.json({ message: "Rules created successfully",  rule}, { status: 201 });

  } catch (error) {
    console.error("Error creating rule:", error);

    // Return a detailed error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
