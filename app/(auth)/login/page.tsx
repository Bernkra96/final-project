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
  // console.log(session);
  return (
    <>
      <h2 className="items text-center font-extrabold text-green-400">
        {' '}
        Welcome Back{' '}
      </h2>

      <p className=" items text-center font-bold  text-green-400">
        {' '}
        Nusername & Paswort: At least 3 characters
      </p>
      <LoginFrom />
    </>
  );
}
