'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSessionByToken } from '../../../database/sessions';
import {
  deleteUserbyName,
  getUserBySessionToken,
} from '../../../database/users';

export async function deleteUser() {
  const cookieStore = cookies();
  const token = cookies().get('sessionToken');
  const user = await getUserBySessionToken(token.value);

  console.log(token);
  console.log(user);
  cookieStore.set('sessionToken', '', { maxAge: -1 });
  if (user) await deleteUserbyName(user.username);

  if (token) await deleteSessionByToken(token.value);
  redirect('/');
}
