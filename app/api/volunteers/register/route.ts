import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, city, skills, availability, interests } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to PostgreSQL via Prisma
    const volunteer = await db.volunteer.create({
      data: {
        name,
        email,
        phone,
        city,
        skills: skills || [],
        availability: availability || 'weekly',
        interests: interests || [],
        created_at: new Date()
      }
    });

    // Send welcome email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_PORT || '465', 10),
      secure: process.env.EMAIL_SECURE !== 'false',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'support@ramakirtifoundation.co.in',
      to: email,
      subject: 'Welcome to Ramakirti Foundation - Volunteer Onboarding',
      html: `
        <h2>Welcome to the Family, ${name}!</h2>
        <p>Thank you for signing up to volunteer with Ramakirti Foundation. Together, we can make a massive difference in Gurgaon's communities.</p>
        <p><strong>Next steps:</strong></p>
        <ol>
          <li>Confirm your email address.</li>
          <li>Join our official WhatsApp group for volunteers.</li>
          <li>Attend our next volunteer induction/orientation session.</li>
        </ol>
        <br>
        <p>Warm regards,</p>
        <p><strong>Team Ramakirti Foundation</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, volunteer_id: volunteer.id });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
