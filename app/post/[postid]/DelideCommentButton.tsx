'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CommentResponseBodyPost } from '../../api/comment/route';

type Props = { searchParams?: string | string[]; id: number };

export default function CommntDelide(
  id: number,
  userIdPage: number,
  Token: string,
) {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  async function handelPostDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/comment', {
      method: 'DELETE',
      body: JSON.stringify({ id, userIdPage, Token }),
    });

    const data: CommentResponseBodyPost = await response.json();
    console.log('Check : ', data);
    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handelPostDelete(event)}>
      <button className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
        Delete Comment
      </button>
    </form>
  );
}
