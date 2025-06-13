import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, marketValue } = body;

    if (!userId || marketValue === undefined || marketValue === null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert market value to lakhs and format to 2 decimal places
    const marketValueInLakhs = (parseFloat(marketValue) / 100000).toFixed(2);

    // First check if the player exists
    let player = await prisma.player.findUnique({
      where: { id: userId },
    });

    // If player doesn't exist, create a new player record
    if (!player) {
      player = await prisma.player.create({
        data: {
          id: userId,
          basePrice: parseFloat(marketValueInLakhs),
        },
      });
      return NextResponse.json({
        ...player,
        basePrice: parseFloat(marketValueInLakhs),
        formattedPrice: `₹${marketValueInLakhs} L`
      });
    }

    // Update the existing player's base price
    const updatedPlayer = await prisma.player.update({
      where: { id: userId },
      data: { basePrice: parseFloat(marketValueInLakhs) },
    });

    return NextResponse.json({
      ...updatedPlayer,
      basePrice: parseFloat(marketValueInLakhs),
      formattedPrice: `₹${marketValueInLakhs} L`
    });
  } catch (error) {
    console.error("Error updating market value:", error);
    return NextResponse.json(
      { error: "Failed to update market value" },
      { status: 500 }
    );
  }
} 