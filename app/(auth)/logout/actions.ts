'use server';

import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';

export async function logout() {
  const cookieStore = cookies();
  const token = cookies().get('sessionToken');
  console.log(token);

  if (token) await deleteSessionByToken(token.value);
  cookieStore.set('sessionToken', '', { maxAge: -1 });
}
