import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("Tournament info request is going on");

    // বর্তমান তারিখ
    const currentDate = new Date();

 
let tournaments = await prisma.tournament.findMany({
  orderBy: {
    createdAt: 'desc'
  }
});


    console.log(tournaments, "tournament");

    // if (!tournaments || tournaments.length == 0) {
    //   return NextResponse.json(
    //     { error: "No tournament exists" },
    //     { status: 400 }
    //   );
    // }

    // // ডাটাবেস আপডেট করার জন্য
    // await prisma.tournament.updateMany({
    //   where: {
    //     tournamentDate: {
    //       gt: currentDate, // যদি tournamentDate বর্তমান তারিখের থেকে বড় হয়
    //     },
    //     status: {
    //       not: "COMPLETED", // যদি status "COMPLETED" না হয়
    //     },
    //   },
    //   data: {
    //     status: "LIVE", // status আপডেট হবে
    //   },
    // });

    // আপডেটের পর টুর্নামেন্ট তালিকা আবার রিটার্ন করা
   // const updatedTournaments = await prisma.tournament.findMany(); // পুরো টেবিলের ডেটা নেবো

    return NextResponse.json(tournaments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
