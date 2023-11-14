'use client';

import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { fromCamel } from 'postgres';
import React, { useState } from 'react';
import { createComment } from '../../../database/commnts';
import { getUserBySessionToken } from '../../../database/users';
import { CommentResponseBodyPost } from '../../api/comment/route';

export default function CreateComment(postid: number) {
  const [post, setPost] = useState('');
  const router = useRouter();
  async function handelpost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postid,
        post,
      }),
    });

    const data: CommentResponseBodyPost = await response.json();
    console.log('Check : ', data);

    router.refresh();
  }

  console.log('postid', postid);
  return (
    <>
      <h2> Make New Comment </h2>

      <form onSubmit={async (event) => await handelpost(event)}>
        <label>
          Post:
          <textarea
            rows={2}
            placeholder="Your Comment"
            onChange={(e) => setPost(e.currentTarget.value)}
          />
        </label>

        <button>Make Post</button>
      </form>
    </>
  );
}
