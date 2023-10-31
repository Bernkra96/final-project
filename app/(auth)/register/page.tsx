import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type } from 'os';
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

  return <RegisterFrom />;
}
