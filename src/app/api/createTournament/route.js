import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Request is going on");
  
    const body = await req.json();
    console.log(body)
    const {
      name,
      tournamentDate,
      registrationFee,
      prizeMoney,
      numberOfTeams,
      rules,
      tournamentIcon,
      gameType,
      match,
      winner,
      createdBy,
      budget,
      venueBudget,
      equipmentBudget,
      staffBudget,
      registrationDeadline,
      auctionDate
    } = body;
   // console.log(body,"body")
    
console.log(createdBy,"createdBy")
  

    //Create a new tournament
    const newTournament = await prisma.tournament.create({
      data: {
        name:name||"",
        tournamentDate: new Date(tournamentDate), // Ensure date is in correct format
        registrationFee:registrationFee||0,
        prizeMoney:prizeMoney||0,
        numberOfTeams:numberOfTeams||0,
        rules:rules||"N/A",
        tournamentIcon:tournamentIcon||"",
        gameType:gameType||"N/A",
        match:match||0,
        status:"Upcoming",
        winner:winner||"not decided yet now",
        createdBy:createdBy||"N/A",
        budget:budget||5000,
        venueBudget:venueBudget||0,
        equipmentBudget:equipmentBudget||0,
        staffBudget:staffBudget||0,
        registrationDeadline:new Date(registrationDeadline)||new Date(),
        auctionDate:new Date(auctionDate)||new Date()
      }
    });

    const updatedUser = await prisma.user.update({
      where: { id: createdBy },  // Find user by `createdBy` (user id)
      data: {
        tournaments: {
          connect: { id: newTournament.id }  // Connect user with the new tournament by its id
        },
        activeStatus: true  // Set the active status to true for the user
      }
    });
    

    return NextResponse.json({ message: "Tournament created successfully",newTournament,updatedUser }, { status: 201 });

  } catch (error) {
   // console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}