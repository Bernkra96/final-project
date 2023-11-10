'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PostResponseBodyPost } from '../api/post/route';

type Props = { searchParams?: string | string[]; id: number };

export default function DeletePost(
  id: number,
  PostuserId: number,
  Token: string,
) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
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
