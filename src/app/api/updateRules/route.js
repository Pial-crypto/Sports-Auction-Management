import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, title, description, category, isDelete } = body;

    if (isDelete && !id) {
      return NextResponse.json({ error: "ID is required for deletion" }, { status: 400 });
    }
    if (!isDelete && (!id || !title || !description || !category)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let rule = null;

    if (isDelete) {
      // Delete the rule
      try {
        rule = await prisma.rules.delete({
          where: { id },
        });
        return NextResponse.json(
          { message: "Rule deleted successfully", rule },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error deleting rule:", error);
        return NextResponse.json({ error: "Failed to delete rule" }, { status: 500 });
      }
    } else {
      // Update the rule
      try {
        rule = await prisma.rules.update({
          where: { id },
          data: { title, description, category },
        });
        return NextResponse.json(
          { message: "Rule updated successfully", rule },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error updating rule:", error);
        return NextResponse.json({ error: "Failed to update rule" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
