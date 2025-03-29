import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (data.type === 'Player Registration') {
      await prisma.playerRequest.update({
        where: { id: data.id },
        data: { status: 'approved' }
      });
    } else {
      await prisma.teamRequest.update({
        where: { id: data.id },
        data: { status: 'approved' }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving request:', error);
    return NextResponse.json(
      { error: 'Failed to approve request' },
      { status: 500 }
    );
  }
} 