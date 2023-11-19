'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { string } from 'zod';
import { PostResponseBodyPost } from '../api/post/route';

export default function DeletePost(
  id: number,
  PostuserId: number,
  Token: string,
) {
  const router = useRouter();

  async function handelPostDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Post Button page delite ', PostuserId, id, Token);
    const response = await fetch('/api/post', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
        PostuserId,
        Token,
      }),
    });

    const data: PostResponseBodyPost = await response.json();
    console.log('Check : ', data);

    router.push(`/`);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handelPostDelete(event)}>
      <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
        Post Delite
      </button>
    </form>
  );
}
