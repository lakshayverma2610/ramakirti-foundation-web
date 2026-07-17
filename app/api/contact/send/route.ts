import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to admin
    const adminMailOptions = {
      from: 'support@ramakirtifoundation.co.in',
      to: 'support@ramakirtifoundation.co.in',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Message from Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(adminMailOptions);

    // Save to database
    const prisma = require('@/lib/db').db || new (require('@prisma/client').PrismaClient)();
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
