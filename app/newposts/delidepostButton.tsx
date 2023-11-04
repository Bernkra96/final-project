'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PostResponseBodyPost } from '../api/post/route';

type Props = { searchParams?: string | string[]; id: number };

export default function DeletePost(
  props: Props,
  id: number,
  PostuserId: number,
) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  async function handelPostDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/post', {
      method: 'DELETE',
      body: JSON.stringify({
        postId: props.id,
        PostuserId,
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
