import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { User } from '../../database/createTableusers';
import { getAllPosts, getAllPostswithUserName } from '../../database/posts';
import Ceradepost from './CeradePostFrom';
import DeletePost from './delidepostButton';

export default async function newPostspage() {
  const posts = await getAllPostswithUserName();
  const tokenCookie = await cookies().get('sessionToken');
  const SeactionIDUSER = tokenCookie?.value;
  console.log('tokenCookie', tokenCookie, SeactionIDUSER);
  return (
    <>
      <Ceradepost />
      <h2> New Posts </h2>

      <ul>
        {posts.map(async (post) => (
          <li key={`post-${post.id}`}>
            <Link href={{ pathname: '/post/' + post.id }}>
              <h3>{post.title}</h3>
              <p>{post.post}</p>
              <p>{post.image}</p>

              <Link href={`/profile/${post.username}`}>
                <p>{post.username}</p>
              </Link>
              <p>{post.id} </p>
            </Link>

            <DeletePost
              id={post.id}
              PostuserId={post.userId}
              Token={SeactionIDUSER}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
