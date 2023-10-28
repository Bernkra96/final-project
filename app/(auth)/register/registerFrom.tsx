'use client';

import { useState } from 'react';

export default function RegisterFrom() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handelregister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log('Check : ', data);
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
