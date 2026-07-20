import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database first so admin panel gets it even if email fails
    const prisma = require('@/lib/db').db || new (require('@prisma/client').PrismaClient)();
    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD && !process.env.EMAIL_PASSWORD.includes('xxxx')) {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
          port: parseInt(process.env.EMAIL_PORT || '465', 10),
          secure: process.env.EMAIL_SECURE !== 'false',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
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
      } else {
        console.warn('Skipping email notification: EMAIL_PASSWORD not fully configured');
      }
    } catch (emailError) {
      console.error('Failed to send email notification, but message was saved to DB:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
