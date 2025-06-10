import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs"; // force Node.js runtime

export async function GET(_req, context) {
  const params = await context.params;
  const id = params.id;

  try {
    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const player = await prisma.player.findUnique({
      where: { id },
      select: { basePrice: true },
    
    });
    console.log(player)
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch (err) {
    console.error("Error fetching player:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}