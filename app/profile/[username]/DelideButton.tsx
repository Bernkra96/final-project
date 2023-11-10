'use client';

import React from 'react';
import { getCookie } from '../../../util/cookies';
import { ProfileResponseBodyPost } from '../../api/profile/route';

export default function DeleteuserButton(
  UserName: string,
  ID: number,
  Token: string,
) {
  async function handeldele(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('UserName Button page delite ', UserName, ID, Token);
    const response = await fetch('/api/profile', {
      method: 'DELETE',
      body: JSON.stringify({
        UserName,
        ID,
        Token,
      }),
    });

    const data: ProfileResponseBodyPost = await response.json();
    console.log('Check : ', data);
  }

  return (
    <form onSubmit={async (event) => await handeldele(event)}>
      <button type="submit">Delete User</button>
    </form>
  );
}
