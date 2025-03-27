import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    console.log(id,"id");

    if (!id) {
    //  return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.announcement.delete({ where: { id } });

    return NextResponse.json({ success: true }); // ✅ JSON ফরম্যাটে রেসপন্স পাঠাচ্ছে
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}
