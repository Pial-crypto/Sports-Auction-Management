import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure correct import

export async function POST(request) {
  try {
    const newAnnouncement = await request.json(); // Parse the incoming request
    console.log(newAnnouncement, "newAnnouncement");

    // Ensure the necessary fields exist and are valid
    if (!newAnnouncement.title || !newAnnouncement.content ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
      // Try to create the announcement in the database
      const announcement = await prisma.announcement.create({
        data: {
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          priority: newAnnouncement.priority,
          type: newAnnouncement.type,
          timestamp: newAnnouncement.timestamp,
          author: newAnnouncement.author,
          tournamentId: newAnnouncement.tournamentId,
          
        },
      });

      // Successfully created the announcement
      return NextResponse.json({ message: "Announcement created successfully", announcement }, { status: 201 });

    } catch (dbError) {
     // console.error('Database error:', dbError); // Log the database error
      return NextResponse.json(dbError, { status: 500 });
    }

  } catch (error) {
    console.error('Failed to process request:', error); // Log any errors that occur during request handling
    return NextResponse.json(error, { status: 500 });
  }
}
