import { NextResponse } from 'next/server';
import { verifyEmail } from '@/controllers/authController';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    const mockRes = {
      status: (statusCode) => ({
        send: (message) => {
          return new NextResponse(message, { status: statusCode });
        },
      }),
    };

    // Create a mock req object for the controller, including query params
    const mockReq = {
      query: { token },
    };

    return await verifyEmail(mockReq, mockRes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 