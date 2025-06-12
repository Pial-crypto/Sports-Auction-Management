import { NextResponse } from "next/server";
import redisClient from "@/socket-server/redis";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Received request body:", body);
    const tournamentId = body?.tournamentId;

    if (!tournamentId) {
      return NextResponse.json({ error: "Tournament ID missing" }, { status: 400 });
    }

    const data = await redisClient.hGet(`auction:${tournamentId}`, "state");
    const parsedState = data ? JSON.parse(data) : {};

    return NextResponse.json(parsedState, { status: 200 });
  } catch (error) {
    console.error("Error fetching auction state:", error);
    return NextResponse.json({ error: "Failed to fetch auction state" }, { status: 500 });
  }
}
