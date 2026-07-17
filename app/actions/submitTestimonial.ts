'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitTestimonialAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !role || !message) {
    throw new Error('All fields are required');
  }

  // Check for duplicates
  const existing = await db.contactMessage.findFirst({
    where: { 
      email,
      subject: `[Testimonial Submission] ${role}` 
    }
  });

  if (existing) {
    throw new Error('You have already submitted a testimonial.');
  }

  // Save as an unapproved message in the contact table
  await db.contactMessage.create({
    data: {
      name,
      email,
      phone: '',
      subject: `[Testimonial Submission] ${role}`,
      message: message,
      is_testimonial: false // Requires admin approval
    }
  });

  revalidatePath('/admin');
}
