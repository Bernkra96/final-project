'use client';

import { cookies } from 'next/headers';
import React, { useState } from 'react';
import { ProfileResponseBodyPost } from '../../api/profile/route';

export default function EditFrom() {
  const token = cookies().get('sessionToken');
  const [username, setUsername] = useState('');

  console.log('token', token);

  async function handelUserUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        token,
      }),
    });

    const data: ProfileResponseBodyPost = await response.json();
    console.log('Check : ', data);

    // if (props.returnTo) {
    // router.push(props.returnTo);
    // return;
    // }
  }

  return (
    <form onSubmit={async (event) => await handelUserUpdate(event)}>
      <label>
        User Name
        <input onChange={(e) => e.currentTarget.value} />
      </label>
      <button>Edit</button>
    </form>
  );
}
