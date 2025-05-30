import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Practice session ID is required" },
        { status: 400 }
      );
    }

    const deletedSession = await prisma.practice.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Practice session deleted successfully",
        deleted: deletedSession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting practice session:", error);
    return NextResponse.json(
      { error: "Something went wrong while deleting session" },
      { status: 500 }
    );
  }
}
