'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CommentResponseBodyPost } from '../../api/comment/route';

type Props = { searchParams?: string | string[]; id: number };

export default function CommntDelide(id: number) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  async function handelPostDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/comment', {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    });

    const data: CommentResponseBodyPost = await response.json();
    console.log('Check : ', data);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handelPostDelete(event)}>
      <button>Delete Comment</button>
    </form>
  );
}
