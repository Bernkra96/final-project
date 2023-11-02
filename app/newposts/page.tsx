import { getImageSize } from 'next/dist/server/image-optimizer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { map } from 'zod';
import { User } from '../../database/createTableusers';
import { getAllPosts, getAllPostswithUserName } from '../../database/posts';
import { getUserByUserId } from '../../database/users';
import Home from '../page';
import Ceradepost from './CeradePostFrom';

export default async function newPostspage() {
  const posts = await getAllPostswithUserName();

  return (
    <>
      <h2> New Posts </h2>

      <Ceradepost />
      <ul>
        {posts.map(async (post) => (
          <li key={post.id}>
            <Link href={{ pathname: '/post/' + post.id }}>
              <h3>{post.title}</h3>
              <p>{post.post}</p>
              <p>{post.image}</p>

              <Link href={'/'}>
                <p>{post.username}</p>
              </Link>
              <p>{post.id} </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
