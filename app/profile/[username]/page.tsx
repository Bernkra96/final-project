import { redirect } from 'next/navigation';
import React from 'react';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import { getCookie } from '../../../util/cookies';
import DeleteuserButton from './DelideButton';
import EditFrom from './EditFrom';

type Props = {
  params: { username: string };
};

export default async function userProfilePage({ params }: Props) {
  console.log('ceck', params);
  const tokenCooke = await getCookie('sessionToken');
  console.log('tokenCooke', tokenCooke);
  const session = tokenCooke && (await getValidSessionByToken(tokenCooke));
  if (!session) {
    redirect('/');
  }
  const user = await getUserBySessionToken(tokenCooke);

  // if (!session || user?.username != params.username) {
  //   redirect('/');
  //}

  return (
    <div>
      <h3> Profle of {params.username}</h3>
    </div>
  );
}
