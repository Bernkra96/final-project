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
    <section className="  mx-auto  max-w-7xl items-center p-6 rounded-lg  bg-green-50">
      <h2 className=" items text-center font-extrabold text-green-400">
        {' '}
        Make New Post{' '}
      </h2>
      <form
        className=" w flex-col justify-center items-center  shadow-lg rounded-lg bg-green-100
        py-5 px-6 sm:py-6 sm:px"
        onSubmit={async (event) => await handelregister(event)}
      >
        <section
          className="flex flex-col justify-center items-center  bg-green-100
             rounded-lg  py-5 px-6 sm:py-6 sm:px-10  "
        >
          <input
            placeholder="Your Title "
            onChange={(e) => setTitle(e.currentTarget.value)}
            className="mx-auto justify-center p-3 border-2 m-2 border-gray-300 rounded-md  w-11/12"
          />

          <textarea
            placeholder="Your Post"
            onChange={(e) => setPost(e.currentTarget.value)}
            className="mx-auto justify-center p-3 border-2 m-2 border-gray-300 rounded-md  w-11/12"
          />

          <input
            placeholder="Your ImageUrl "
            onChange={(e) => setImage(e.currentTarget.value)}
            className=" justify-center p-3 border-2 m-2 border-gray-300 rounded-md  w-11/12"
          />

          <button className=" mx-auto flex  justify-center rounded-md bg-green-600 p-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 m-2 w-11/12">
            Make Post
          </button>
        </section>
      </form>
    </section>
  );
}
