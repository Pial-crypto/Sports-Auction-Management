import { de } from 'date-fns/locale';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(req) {
  //console.log(req,"Req")
  const authHeader = req.headers.get('Authorization');
//  console.log("authHeader",authHeader)
  if (!authHeader) {
    return new NextResponse(
      JSON.stringify({ message: 'No token provided' }),
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];  
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Token format is invalid' }),
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log("Decoded",decoded)
    req.user = decoded; // ইউজার তথ্য রিকুয়েস্টে যুক্ত করা
    return null; // কোনো সমস্যা না হলে null রিটার্ন করা
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid or expired token' }),
      { status: 401 }
    );
  }
}
