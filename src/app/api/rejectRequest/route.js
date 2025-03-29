import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (data.type === 'Player Registration') {
      await prisma.playerRequest.update({
        where: { id: data.id },
        data: { status: 'rejected' }
      });
    } else {
      await prisma.teamRequest.update({
        where: { id: data.id },
        data: { status: 'rejected' }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error rejecting request:', error);
    return NextResponse.json(
      { error: 'Failed to reject request' },
      { status: 500 }
    );
  }
} 