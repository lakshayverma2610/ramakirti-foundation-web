'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitVolunteerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const city = formData.get('city') as string;
  const availability = formData.get('availability') as string;
  const skills = formData.getAll('skills') as string[];
  const interests = formData.getAll('interests') as string[];

  if (!name || !email || !phone || !city) {
    throw new Error('Please fill all required fields');
  }

  await db.volunteer.create({
    data: {
      name,
      email,
      phone,
      city,
      availability,
      skills,
      interests,
      status: 'Pending',
    },
  });

  revalidatePath('/admin');
}
