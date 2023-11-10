import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { User } from '../../database/createTableusers';
import { getAllPosts, getAllPostswithUserName } from '../../database/posts';
import { getUserBySessionToken } from '../../database/users';
import { editpermiston } from '../../util/editpermiston';
import Ceradepost from './CeradePostFrom';
import DeletePost from './delidepostButton';

export default async function newPostspage() {
  const posts = await getAllPostswithUserName();
  const tokenCookie = await cookies().get('sessionToken');
  const SeactionIDUSER = tokenCookie?.value;
  const user = await getUserBySessionToken(tokenCookie?.value);

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
              <Link href={{ pathname: '/post/' + post.id }}>
                <h3>{post.title}</h3>
                <p>{post.post}</p>
                {post.image ? (
                  <Image
                    src={post.image}
                    alt="post image"
                    width={500}
                    height={500}
                  />
                ) : null}
                <Link href={`/profile/${post.username}`}>
                  <p>{post.username}</p>
                </Link>
                <p>{post.id} </p>
              </Link>
            </Link>
            {(await editpermiston(
              post.userId,
              user?.id,
              tokenCookie,
              post.id,
            )) ? (
              <DeletePost
                id={post.id}
                PostuserId={post.userId}
                Token={SeactionIDUSER}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
