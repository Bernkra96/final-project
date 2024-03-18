import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterFrom from './registerFrom';

export default async function RegisterPage() {
  const tokenCooke = cookies().get('sessionToken');

  const session =
    tokenCooke && (await getValidSessionByToken(tokenCooke.value));

  if (session) {
    redirect('/');
  }
  console.log(session);

  return (
    <>
      <h1 className=" items text-center font-extrabold  text-green-400">
        {' '}
        Welcomme to Canvas{' '}
      </h1>
      <h2 className=" items text-center font-extrabold  text-green-400">
        {' '}
        Makre a User Prfile{' '}
      </h2>
      <RegisterFrom />
    </>
  );
}
