'use client';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterFrom() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  async function handelregister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();
    console.log('Check : ', data);

    if ('errors' in data) {
      setError(`Error `);

      return;
    }

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
          className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md  "
        />

        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Regster
        </button>
      </form>
      <p> {error} </p>
    </>
  );
}
