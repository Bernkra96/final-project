'use client';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterFrom() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrror] = useState('');

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
      setErrror(data.errors);
      return;
    }

    router.push(`/profile/${data.user.username}`);
  }

  return (
    <form onSubmit={async (event) => await handelregister(event)}>
      <label>
        <input onChange={(e) => setUsername(e.currentTarget.value)} />
        UserName
      </label>

      <label>
        <input
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        Password
      </label>

      <button>Regster</button>
    </form>
  );
}
