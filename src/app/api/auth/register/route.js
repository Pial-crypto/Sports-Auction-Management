import { NextResponse } from 'next/server';
import { register } from '@/controllers/authController';

export async function POST(req) {
  try {
    const body = await req.json();
    const mockRes = {
      status: (statusCode) => ({
        json: (data) => {
          return NextResponse.json(data, { status: statusCode });
        },
        send: (message) => {
          return NextResponse.json({ message }, { status: statusCode });
        },
      }),
    };
    
    return await register(req, mockRes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}