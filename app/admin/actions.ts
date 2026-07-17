'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function loginAction(formData: FormData) {
  const password = formData.get('password');
  if (password === (process.env.ADMIN_PASSWORD || 'ramakirti2026')) {
    cookies().set('admin_auth', 'true', { httpOnly: true, secure: true, path: '/' });
    redirect('/admin');
  } else {
    throw new Error('Invalid password');
  }
}

export async function logoutAction() {
  cookies().delete('admin_auth');
  redirect('/admin/login');
}

export async function makeTestimonialAction(id: string) {
  await db.contactMessage.update({
    where: { id },
    data: { is_testimonial: true }
  });
}

export async function removeTestimonialAction(id: string) {
  await db.contactMessage.update({
    where: { id },
    data: { is_testimonial: false }
  });
}

export async function createInitiativeAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as File;
  
  if (!title || !description || !image) {
    throw new Error('Missing fields');
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = `data:${image.type};base64,${buffer.toString('base64')}`;

  await db.initiative.create({
    data: {
      title,
      description,
      image_url: base64
    }
  });
}

export async function deleteInitiativeAction(id: string) {
  await db.initiative.delete({
    where: { id }
  });
}
