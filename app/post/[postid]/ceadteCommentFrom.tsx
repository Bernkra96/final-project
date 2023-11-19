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
    <div className="  mx-auto   items-center  rounded-lg  ">
      <h2 className="items text-center font-extrabold  text-green-400">
        Make New Comment{' '}
      </h2>

      <form
        onSubmit={async (event) => await handelpost(event)}
        className=" mx-auto   items-center  p-6 lg:px-0 rounded-lg  "
      >
        <textarea
          rows={2}
          cols={50}
          placeholder="Your Comment"
          onChange={(e) => setPost(e.currentTarget.value)}
          className="mx-auto justify-center p-3 border-2 item-center   flex border-gray-300 rounded-md  w-11/12"
        />

        <button className="mx-auto flex  justify-center rounded-md bg-green-600 p-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600  w-11/12">
          Make Comment
        </button>
      </form>
    </div>
  );
}
