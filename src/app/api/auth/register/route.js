import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req) {
    try{
        console.log("requst is going on")
const body=await req.json();
const {name,email,password,role,activeStatus}=body;
const existingUser=await prisma.user.findUnique({where:{email}})

if(existingUser){
    return NextResponse.json({error:"User already exist"},{status:400})

}

const hashedPassowrd=await bcrypt.hash(password,10);

const newUser=await prisma.user.create(
    {
        data:{
            name,email,password:hashedPassowrd,role,activeStatus
        }
    }
)
return NextResponse.json({message:"Registration successfull",user:{newUser,id:newUser.id}},{status:201});

     }catch(error){
        console.log(error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
     }
}