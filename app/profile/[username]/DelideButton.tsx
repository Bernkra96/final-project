'use client';

import router from 'next/router';
import React from 'react';
import { ProfileResponseBodyPost } from '../../api/profile/route';

export default function DeleteUserButton(
  UserName: string,
  ID: number,
  Token: string,
) {
  async function handelDelete(event: React.FormEvent<HTMLFormElement>) {
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
    await router.push(`/`);
  }

  return (
    <form
      onSubmit={async (event) => await handelDelete(event)}
      className=" mx-auto   items-center  p-6 lg:px-0 rounded-lg  "
    >
      <button
        className="flex  w-full justify-center  rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
        "
      >
        Delete User
      </button>
    </form>
  );
}
