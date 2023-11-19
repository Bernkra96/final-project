'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = {
  returnTo: string | string[] | undefined;
  searchParams?: string | string[];
};

export default function LoginFrom(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrror] = useState('');

  const router = useRouter();

  async function handelregister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();
    // console.log('Check : ', data);

    if ('errors' in data) {
      setErrror(`Error `);

      return;
    }
    console.log(error);
    console.log(SearchParamsContext);
    // if (props.returnTo) {
    // router.push(props.returnTo);
    // return;
    // }

    router.push(`/profile/${data.user.username}`);

    router.refresh();
  }

  return (
    <>
      <form onSubmit={async (event) => await handelregister(event)}>
        <input
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="User Name"
          className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
          className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md"
        />

        <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Login
        </button>
      </form>
      <p> {error} </p>
    </>
  );
}
