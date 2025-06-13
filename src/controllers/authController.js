import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
});

export async function register(req) {
  try {
    const { email, password } = await req.json();

    // if (!email.endsWith('@sust.edu')) {
    //   return new Response(JSON.stringify({ error: 'Only SUST emails allowed' }), { 
    //     status: 400,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save to DB
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verified: false,
      }
    });

    const link = `${process.env.BASE_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
      to: email,
      from: 'verify@sustcse.com',
      subject: 'Verify your SUST email',
      html: `<p>Click <a href="${link}">here</a> to verify your email</p>`
    });

    return new Response(JSON.stringify({ message: 'Verification email sent' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function verifyEmail(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { email: decoded.email }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await prisma.user.update({
      where: { email: decoded.email },
      data: { verified: true }
    });

    return new Response(JSON.stringify({ message: 'Email verified successfully' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Verification error:', error);
    return new Response(JSON.stringify({ error: 'Verification failed' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function login(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!user.verified) {
      return new Response(JSON.stringify({ error: 'Email not verified' }), { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return new Response(JSON.stringify({ error: 'Wrong password' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return new Response(JSON.stringify({ token }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 