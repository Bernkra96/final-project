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
  const seactionIdUser = String(tokenCookie?.value);
  const user = await getUserBySessionToken(seactionIdUser);
  const userId = Number(user?.id);

  console.log('tokenCookie', tokenCookie, seactionIdUser);
  return (
    <div className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  rounded-lg  bg-green-100 ">
      <Ceradepost />
      <h2 className=" items text-center font-extrabold  text-green-400">
        {' '}
        New Posts{' '}
      </h2>

      <ul className=" justify-center items items-center ">
        {posts.map(async (post) => (
          <li
            key={`post-${post.id}`}
            className="flex flex-col justify-center items-center  rounded-lg bg-green-50
            py-5 px-6 sm:py-6 sm:px-10"
          >
            <div
              className="flex flex-col justify-center items-center  bg-green-100 w-full
             rounded-lg shadow-lg py-5 px-6 "
            >
              <Link
                className="mx-auto justify-center p-6 lg:px-4 "
                href={`/post/${post.id}`}
              >
                <h3 className="mx-auto justify-center p-1  font-bold text-green-400  ">
                  {post.title}
                </h3>
                <p className="mx-auto justify-center p-1 ">{post.post}</p>

                {post.image ? (
                  <img
                    src={post.image}
                    className="h-50 w-50 flex-none  bg-gray-50"
                    alt="Picture of the author"
                  />
                ) : null}

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post from {post.username}
                </p>

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post Nr: {post.id}{' '}
                </p>
              </Link>
              {(await editpermiston(
                post.userId,
                userId,
                seactionIdUser,
                post.id,
              )) ? (
                <DeletePost
                  id={post.id}
                  PostuserId={post.userId}
                  Token={seactionIdUser}
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
