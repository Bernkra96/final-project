'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken, updateUser } from '../../../database/users';

export async function EditUser(username: string) {
  const inpoutUsername = username;
  const cookieStore = cookies();
  const token = cookies().get('sessionToken');
  const user = await getUserBySessionToken(token.value);
  console.log(token);
  console.log(user);
  console.log(inpoutUsername);
  let newUsername = user?.username;

  if (inpoutUsername.length > 2) {
    newUsername = inpoutUsername;
  }
  console.log(newUsername);
  if (user) await updateUser(user.username, newUsername);

  // redirect('/');
}
