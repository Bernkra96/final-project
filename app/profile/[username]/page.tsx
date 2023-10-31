import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type } from 'os';
import React from 'react';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import DeleteuserButton from './DelideButton';
import EditFrom from './EditFrom';

type Props = {
  params: { username: string };
};

export default async function userProfilePage({ params }: Props) {
  console.log('ceck', params);
  const tokenCooke = cookies().get('sessionToken');

  const session =
    tokenCooke && (await getValidSessionByToken(tokenCooke.value));
  if (!session) {
    redirect('/');
  }
  const user = await getUserBySessionToken(tokenCooke.value);

  if (!session || user?.username != params.username) {
    redirect('/');
  }

  return (
    <div>
      <h3> Profle of {params.username}</h3>
      <DeleteuserButton />
    </div>
  );
}
