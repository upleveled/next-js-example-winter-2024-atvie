'use server';

import { cookies } from 'next/headers';

export async function createCookie(value) {
  await cookies().set('testCookie', value);
}
