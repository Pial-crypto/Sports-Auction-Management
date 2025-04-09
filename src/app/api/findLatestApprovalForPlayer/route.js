import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const data = await req.json();
    const playerId = data.playerId;
    const managerId = data.managerId;

    console.log("playerId:", playerId);
    console.log("managerId:", managerId);

    // Dynamically build the where clause
    const whereClause = playerId
      ? { playerId: playerId }
      : { managerId: managerId };

    const latestApproval = await prisma.approval.findFirst({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        message: latestApproval
          ? 'Latest approval fetched successfully'
          : 'No latest approval found',
        latestApproval,
      },
      { status: latestApproval ? 200 : 404 }
    );
  } catch (error) {
    console.error('Failed to fetch latest approval:', error);
    return NextResponse.json(
      {
        message: 'Failed to fetch latest approval',
        latestApproval: [],
      },
      { status: 500 }
    );
  }
}
