import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Saving transaction request...");

    // Parse request body
    const body = await req.json();
    console.log(body,"body from save transaction")
    if (!body || !body.description || !body.amount || !body.tournamentId || !body.date || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    
    const newTransaction = await prisma.transaction.create({
      data: {
        description: body.description,
        amount: body.amount,
        tournamentId: body.tournamentId,
        type:body.type,
        date: new Date(),
        category: body.category,
      },
    });

    console.log("Transaction saved:", newTransaction);

    return NextResponse.json(
      { message: "Transaction saved successfully",transaction:newTransaction },
      { status: 200 }
    );
  } catch (error) {
   // console.error("Error saving transaction:", error);
    return NextResponse.json({ error}, { status: 500 });
  }
}
