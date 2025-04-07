import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ✅ Correct Import

export async function POST(req) {
  try {

    const data = await req.json();
    const playerId = data.playerId;
    console.log("playerId",playerId)
    const latestApproval = await prisma.approval.findFirst({ 
      where: {
        playerId: playerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // const myLatestApproval=latestApproval.find(approval=>approval.playerId===playerId)
    // console.log("myLatestApproval",myLatestApproval)
    //console.log("latestApproval",latestApproval)

    return NextResponse.json({
      message: latestApproval ? 'Latest approval fetched successfully' : 'No latest approval found',
      latestApproval,
    }, { status: latestApproval ? 200 : 400 });

  } catch (error) {
    console.error('Failed to fetch latest approval:', error);
    return NextResponse.json({
      message: 'Failed to fetch latest approval',
      latestApproval: [],
    }, { status: 500 });
  }
}
