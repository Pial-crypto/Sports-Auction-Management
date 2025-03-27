import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("updateAnnouncement route is called")
  try {
    const body = await req.json();
    console.log(body,"body")
await prisma.announcement.update({
  where: { id: body.id },
  data: {
    ...body,
    timestamp: new Date().toISOString(),
    
  }
});

return NextResponse.json({ message: "Announcement updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({error}, { status: 500 });
  }
}
