import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure correct import

export async function POST(request) {
  try {
    const reqInfo = await request.json(); // Parse the incoming request
    console.log(reqInfo, "newReqInfo");

   

    try {
     // Try to create the announcement in the database
      const newReqInfo = await prisma.teamRequest.create({
        data: {
            tournamentId:reqInfo.tournamentId,
            teamName:reqInfo.teamName,
            managerId:reqInfo.managerId,
            managerEmail:reqInfo.email,
            managerName:reqInfo.managerName,
            managerNumber:reqInfo.contactNumber,
            previousTournament:reqInfo.previousTournaments,
            teamDescription:reqInfo.teamDescription,
            approved:false,
            createdAt:new Date(),
          
        },
      });

      // Successfully created the announcement
      return NextResponse.json({ message: " Reqinfo created successfully", reqInfo:newReqInfo}, { status: 201 });

    } catch (dbError) {
   
      return NextResponse.json(dbError, { status: 500 });
    }

  } catch (error) {
   
    return NextResponse.json({error}, { status: 500 });
  }
}
