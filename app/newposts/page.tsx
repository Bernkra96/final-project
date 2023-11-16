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
    <div className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100 ">
      <Ceradepost />
      <h2 className=" items text-center "> New Posts </h2>

      <ul className=" justify-center items items-center ">
        {posts.map(async (post) => (
          <li
            key={`post-${post.id}`}
            className="flex flex-col justify-center items-center  bg-green-50
             rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
          >
            <div
              className="flex flex-col justify-center items-center  bg-green-100
             rounded-lg shadow-lg py-5 px-6 "
            >
              <Link
                className="mx-auto justify-center p-6 lg:px-4 "
                href={`/post/${post.id}`}
              >
                <h3 className="mx-auto justify-center p-1 ">{post.title}</h3>
                <p className="mx-auto justify-center p-1 ">{post.post}</p>
                <Link
                  className="mx-auto justify-center p-1 "
                  href={`/profile/${post.username}`}
                >
                  <p className="mx-auto justify-center p-1 ">{post.username}</p>
                </Link>
                <p className="mx-auto justify-center p-1 ">{post.id} </p>

                {post.image ? (
                  <img
                    src={post.image}
                    className="h-50 w-50 flex-none  bg-gray-50"
                    alt="Picture of the author"
                  />
                ) : null}
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
