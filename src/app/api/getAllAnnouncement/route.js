import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ✅ Correct Import

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({ 
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json({
      message: 'Announcements fetched successfully',
      announcements,
    }, { status: 200 });

  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return NextResponse.json({
      message: 'Failed to fetch announcements',
      announcements: [],
    }, { status: 500 });
  }
}
