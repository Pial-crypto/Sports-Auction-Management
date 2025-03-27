import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Mock data for development
const mockAnnouncements = [
  {
    id: 1,
    title: "Tournament Schedule Update",
    content: "Due to weather conditions, all matches scheduled for tomorrow will be delayed by 2 hours.",
    priority: "high",
    type: "schedule",
    timestamp: "2024-01-20 14:30",
    author: "Tournament Admin",
    status: "active"
  },
  {
    id: 2,
    title: "New Team Registration Deadline",
    content: "Team registration deadline has been extended to January 25th, 2024.",
    priority: "medium",
    type: "registration",
    timestamp: "2024-01-19 10:15",
    author: "Registration Committee",
    status: "active"
  },
  {
    id: 3,
    title: "Venue Change Notice",
    content: "The semifinal matches will be held at the Olympic Stadium instead of Central Arena.",
    priority: "high",
    type: "venue",
    timestamp: "2024-01-18 09:00",
    author: "Event Manager",
    status: "active"
  },
  {
    id: 4,
    title: "Player Registration Success",
    content: "All team rosters have been successfully verified for the upcoming tournament.",
    priority: "low",
    type: "registration",
    timestamp: "2024-01-17 16:45",
    author: "Registration Team",
    status: "active"
  }
];

export async function GET() {
  try {
    // First try to get from database
    let announcements;
    try {
      const announcements = await prisma.announcement.findMany({
        orderBy: {
          timestamp: 'desc',
        },
      });
    } catch (dbError) {
      console.log('Database not available, using mock data');
      // If database fails, use mock data
      //announcements = mockAnnouncements;
    }

    // If no announcements in DB, use mock data
    if (!announcements || announcements.length === 0) {
      announcements = mockAnnouncements;
    }

    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    // Return mock data as fallback
    return NextResponse.json(mockAnnouncements);
  }
}



// Add PUT endpoint for editing
export async function PUT(request) {
  try {
    const data = await request.json();
    let updatedAnnouncement;

    try {
      // Try to update in database
      updatedAnnouncement = await prisma.announcement.update({
        where: { id: data.id },
        data: data,
      });
    } catch (dbError) {
      console.log('Database not available, using mock update');
      // If database fails, update mock announcement
      const index = mockAnnouncements.findIndex(a => a.id === data.id);
      if (index !== -1) {
        mockAnnouncements[index] = { ...mockAnnouncements[index], ...data };
        updatedAnnouncement = mockAnnouncements[index];
      }
    }

    return NextResponse.json(updatedAnnouncement);
  } catch (error) {
    console.error('Failed to update announcement:', error);
    return NextResponse.json(
      { error: 'Failed to update announcement' },
      { status: 500 }
    );
  }
}


