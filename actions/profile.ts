'use server';
import { db } from '@/db/db';
import { profile } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { he } from 'zod/v4/locales';
import { eq } from 'drizzle-orm';

export async function getProfileData(userId: string | undefined) {
  if (!userId) return null;

  const profile = await db.query.profile.findFirst({
    where: (profile, { eq }) => eq(profile.userId, userId),
  });
  return profile;
}
