'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = {
  returnTo: string | string[] | undefined;
  searchParams?: string | string[];
};

export default function LoginFrom(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

    if ('errors' in data) {
      setError(
        'Error: ' + data.errors[0].message ? data.errors[0].message : ' Error',
      );

      return;
    }

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
          type="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="User Name"
          className="mx-auto flex justify-center p-3 border-2 m-1 border-gray-300 rounded-md"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
          className="mx-auto flex justify-center p-3 border-2 m-1 border-gray-300 rounded-md"
        />
        {username.length > 2 && password.length > 2 ? (
          <button className=" w-full justify-center rounded-md bg-green-600  m-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Login
          </button>
        ) : (
          <div className=" w-full justify-center rounded-md  bg-gray-600  m-3 px-3 py-1.5  font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Login
          </div>
        )}
      </form>

      {error.length > 0 ? (
        <p className=" w-80 justify-center rounded-md bg-red-600  m-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          {error}
        </p>
      ) : null}
    </>
  );
}
