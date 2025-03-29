import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure correct import

export async function POST(request) {
  try {
    const reqInfo = await request.json(); // Parse the incoming request
    console.log(reqInfo, "newReqInfo");

   

    try {
     // Try to create the announcement in the database
      const newReqInfo = await prisma.playerRequest.create({
        data: {
            ...reqInfo
          
        },
      });

      // Successfully created the announcement
      return NextResponse.json({ message: " Reqinfo created successfully", reqInfo:newReqInfo}, { status: 201 });

    } catch (dbError) {
   
      return NextResponse.json(dbError, { status: 500 });
    }

  } catch (error) {
   
    return NextResponse.json(error, { status: 500 });
  }
}
