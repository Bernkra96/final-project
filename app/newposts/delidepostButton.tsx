'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { PostResponseBodyPost } from '../api/post/route';

export default function DeletePost(
  id: number,
  PostUserId: number,
  Token: string,
) {
  const router = useRouter();

  async function handelPostDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/post', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
        postUserId: PostUserId,
        Token,
      }),
    });

    const data: PostResponseBodyPost = await response.json();

    router.push(`/`);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handelPostDelete(event)}>
      <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
        Delete Post
      </button>
    </form>
  );
}
