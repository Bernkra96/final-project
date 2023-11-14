'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
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
      <button>Post Delite</button>
    </form>
  );
}
