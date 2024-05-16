'use client';

import React, { useState } from 'react';
import { ProfileResponseBodyPost } from '../../api/profile/route';

export default function EditFrom(UserName: string, ID: number, Token: string) {
  const [newUsername, setNewUsername] = useState('');

  async function handelUserUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        newUsername,
        UserName,
        ID,
        Token,
      }),
    });

    const data: ProfileResponseBodyPost = await response.json();
    console.log('Check : ', UserName, ID, Token, newUsername);

    // if (props.returnTo) {
    // router.push(props.returnTo);
    // return;
    // }
  }
  console.log('Check : ', UserName, ID, Token, newUsername);
  return (
    <form onSubmit={async (event) => await handelUserUpdate(event)}>
      <label>
        User Name
        <input onChange={(e) => setNewUsername(e.currentTarget.value)} />
      </label>
      <button
        className="flex  w-full justify-center  rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
      "
      >
        Edit
      </button>
    </form>
  );
}
