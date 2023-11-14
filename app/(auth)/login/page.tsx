import { type } from 'node:os';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import EditFrom from '../../profile/[username]/EditFrom';
import LoginFrom from './llogInFrom';

type Props = { searchParams?: string | string[] };

export default async function LoginPage({ searchParams }: Props) {
  const tokenCooke = cookies().get('sessionToken');

  const session =
    tokenCooke && (await getValidSessionByToken(tokenCooke.value));

  if (session) {
    redirect('/');
  }
  console.log(session);
  return <LoginFrom returnTo={''} />;
}
