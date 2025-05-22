import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data,"Here is the auction data")

    await prisma.auction.create({
      data: {
        playerId: data.playerId || "N/A",
        tournamentId: data.tournamentId,
        managerId: data.managerId || "N/A",
        createdAt: data.createdAt || new Date(),
        teamId: data.teamId || "N/A",
        teamName: data.teamName || "N/A",
        soldStatus: data.soldStatus || false,
        

      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving request:', error);
    return NextResponse.json(
      { error: 'Failed to approve request' },
      { status: 500 }
    );
  }
}
