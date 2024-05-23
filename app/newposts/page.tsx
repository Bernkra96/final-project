import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { getAllPostsWithUserName } from '../../database/posts';
import { getUserBySessionToken } from '../../database/users';
import { editPermission } from '../../util/editpermiston';
import CeratePost from './CeradePostFrom';
import DeletePost from './delidepostButton';

export default async function newPostspage() {
  const posts = await getAllPostsWithUserName();
  const tokenCookie = await cookies().get('sessionToken');
  const sectionIdUser = String(tokenCookie?.value);
  const user = await getUserBySessionToken(sectionIdUser);
  const userId = Number(user?.id);
  const sortedPostsByDate = posts.sort(function (a, b) {
    const dateA = new Date(a.postTime).getTime();
    const dateB = new Date(b.postTime).getTime();
    return dateB - dateA;
  });

  return (
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  rounded-lg  bg-green-100 ">
      {user ? (
        <CeratePost />
      ) : (
        <h2 className=" items text-center font-extrabold  text-green-400">
          Login / Register to Post
        </h2>
      )}

      <div>
        <h2 className=" items text-center font-extrabold  text-green-400">
          New Posts
        </h2>
      </div>
      <ul className=" justify-center items items-center ">
        {sortedPostsByDate.map(async (post) => (
          <li
            key={`post-${post.id}`}
            className="flex flex-col justify-center items-center  rounded-lg bg-green-50
            py-5 px-6 sm:py-6 sm:px-10"
          >
            <section
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
                    className="h-50 w-50 flex-none bg-gray-50"
                    alt=""
                  />
                ) : null}

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post by {post.username}
                </p>

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Date: {new Date(post.postTime).toString()}
                </p>

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post ID: {post.id}{' '}
                </p>
              </Link>
              {user ? (
                <>
                  {' '}
                  {(await editPermission(
                    post.userId,
                    userId,
                    sectionIdUser,
                  )) ? (
                    <DeletePost
                      id={post.id}
                      PostUserId={post.userId}
                      Token={sectionIdUser}
                    />
                  ) : null}
                </>
              ) : null}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
