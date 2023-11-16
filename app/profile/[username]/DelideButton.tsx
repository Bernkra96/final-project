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
    <form
      onSubmit={async (event) => await handeldele(event)}
      className=" mx-auto   items-center  p-6 lg:px-0 rounded-lg  "
    >
      <button
        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        type="submit"
      >
        Delete User
      </button>
    </form>
  );
}
