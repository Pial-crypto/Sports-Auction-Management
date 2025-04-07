import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();

    console.log(data,"Inside addApprovaltoTable");
    
    
      await prisma.approval.create({
       
        data: { 
          playerId: data.playerId,
          tournamentId: data.tournamentId,
          createdAt: data.createdAt,
        }   
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