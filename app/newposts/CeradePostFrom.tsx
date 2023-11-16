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
    <div className="  mx-auto  max-w-7xl items-center p-6 rounded-lg shadow-lg  ">
      <h2 className="mx-auto center p-1 "> Make New Post </h2>
      <form
        className=" mx-auto   items-center  p-6 lg:px-0 rounded-lg  "
        onSubmit={async (event) => await handelregister(event)}
      >
        <div
          className="flex flex-col justify-center items-center  bg-green-50
             rounded-lg  py-5 px-6 sm:py-6 sm:px-10  "
        >
          <input
            placeholder="Your Title "
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md"
          />

          <textarea
            rows={2}
            cols={50}
            placeholder="Your Post"
            onChange={(e) => setPost(e.currentTarget.value)}
            className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md"
          />

          <input
            placeholder="Your ImageUrl "
            onChange={(e) => setImage(e.currentTarget.value)}
            className="mx-auto justify-center p-3 border-2 border-gray-300 rounded-md"
          />
        </div>

        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Make Post
        </button>
      </form>
    </div>
  );
}
