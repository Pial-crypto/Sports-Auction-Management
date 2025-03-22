import { NextResponse } from 'next/server';
import { verifyToken } from '../middleware/verifyToken'; // verifyToken.js ফাইল ইম্পোর্ট করা

export async function GET(req) {

    console.log("I am working bro to the protected route")
  // JWT যাচাই করার জন্য মিডলওয়্যার ফাংশন কল করা
  const result = verifyToken(req);
  console.log("The big result",result)
  if (result) {
    console.log("inside null")
    // যদি কোনো সমস্যা থাকে, যেমন টোকেন ভ্যালিড না হয়, তবে error রিটার্ন হবে
    return result;
  }

  // যদি JWT টোকেন ভ্যালিড হয়, তাহলে ইউজার তথ্য পাওয়া যাবে
  const user = req.user; // মিডলওয়্যার থেকে ইউজার তথ্য পেয়েছি

  return NextResponse.json({
    message: 'Access granted',
    user,  // ইউজারের তথ্য রিটার্ন করা
  });
}
