'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PostResponseBodyPost } from '../api/post/route';

type Props = { searchParams?: string | string[] };

export default function Ceradepost(props: Props) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  async function handelregister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        post,
        image,
      }),
    });

    const data: PostResponseBodyPost = await response.json();
    console.log('Check : ', data);
    router.refresh();
  }

  return (
    <>
      <h2> Make New Post </h2>
      <form onSubmit={async (event) => await handelregister(event)}>
        <label>
          Title:
          <input
            placeholder="Your Title "
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        <label>
          Post:
          <textarea
            rows={2}
            placeholder="Your Post"
            onChange={(e) => setPost(e.currentTarget.value)}
          />
        </label>
        <label>
          Iamge URL:
          <input
            placeholder="Your ImageUrl "
            onChange={(e) => setImage(e.currentTarget.value)}
          />
        </label>

        <button>Make Post</button>
      </form>
    </>
  );
}
