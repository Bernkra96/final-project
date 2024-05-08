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

  return (
    <>
      <h1 className=" items text-center font-extrabold  text-green-400">
        {' '}
        Welcome to CanvasView{' '}
      </h1>
      <h2 className=" items text-center font-extrabold  text-green-400">
        {' '}
        Make your user Profile{' '}
      </h2>
      <p className=" items text-center font-bold  text-green-400">
        {' '}
        Username : No Spaces , Only A-Z a-z 0-9 , at least 3 Characters
      </p>
      <p className=" items text-center font-bold  text-green-400">
        {' '}
        Password : At least 6 Characters{' '}
      </p>
      <RegisterFrom />
    </>
  );
}
