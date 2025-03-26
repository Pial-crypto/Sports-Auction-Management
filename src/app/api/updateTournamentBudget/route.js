import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body,"body from update budget")
    const { id, budgetSpent, prizeMoneySpent, remainingBudget ,venueSpent,equipmentSpent,staffSpent} = body;

   if(!id)   return NextResponse.json({ error: "Missing id" }, { status: 400 });
        console.log(id,"id from update budget")
      try {
        const tournament = await prisma.tournament.update({
          where: { id },
          data:{
           
            remainingBudget,
            
            venueSpent,
            equipmentSpent,
            staffSpent,
            prizeMoneySpent,
            budgetSpent,
          }
        });
        return NextResponse.json(
          { message: "Budget updated successfully", tournament },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error updating budget:", error);
        return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
      }
    
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
