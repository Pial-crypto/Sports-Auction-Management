import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { userId, marketValue } = body;

    if (!userId || !marketValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the player's base price
    const updatedPlayer = await prisma.player.update({
      where: { id: userId },
      data: { basePrice: parseFloat(marketValue) },
    });

    return NextResponse.json(updatedPlayer);
  } catch (error) {
    console.error("Error updating market value:", error);
    return NextResponse.json(
      { error: "Failed to update market value" },
      { status: 500 }
    );
  }
} 