'use client';

import React, { useState } from 'react';
import { ProfileResponseBodyPost } from '../../api/profile/route';

export default function EditFrom(UserName: string, ID: number, Token: string) {
  const [newUsername, setNewUsername] = useState('');
  const id = ID;
  const token = Token;
  const username = UserName;

  async function handelUserUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({
        NewUserName: newUsername,
        UserName: username,
        ID: id,
        Token: token,
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
        <input onChange={(e) => setNewUsername(e.currentTarget.value)} />
      </label>
      <button>Edit</button>
    </form>
  );
}
