import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { isAdmin } from '../../../database/admins';
import { getPostswithUserid } from '../../../database/posts';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import { getCookie } from '../../../util/cookies';
import { editPermission } from '../../../util/editpermiston';
import DeletePost from '../../newposts/delidepostButton';
import DeleteUserButton from './DelideButton';

type Props = {
  params: { username: string };
};

export default async function userProfilePage({ params }: Props) {
  const tokenCooke = await getCookie('sessionToken');

  const session = tokenCooke && (await getValidSessionByToken(tokenCooke));
  if (!session) {
    redirect('/');
  }
  const user = await getUserBySessionToken(tokenCooke);

  const profileUser = await getUserByUsername(params.username);
  const profileUserId = Number(profileUser?.id);
  const profilePosts = await getPostswithUserid(Number(profileUserId));
  const sortedProfilePostsByDate = profilePosts.sort(function (a, b) {
    const dateA = new Date(a.postTime).getTime();
    const dateB = new Date(b.postTime).getTime();
    return dateB - dateA;
  });

  return (
    <section>
      <h3 className=" items text-center font-extrabold  text-green-400 ">
        Profile of {params.username}
      </h3>
      {(await isAdmin(profileUserId)) ? (
        <p className="  items text-center font-extrabold  text-orange-400 ">
          Is Admin
        </p>
      ) : null}

      {params.username === user?.username ? (
        <DeleteUserButton
          UserName={params.username}
          ID={user?.id}
          Token={tokenCooke}
        />
      ) : null}
      <h3 className=" items text-center font-extrabold  text-green-400">
        User Posts
      </h3>
      <h3 className=" items text-center font-extrabold  text-green-400">
        {' '}
        Number of Posts: {profilePosts.length}{' '}
      </h3>

      <h3 className=" items text-center font-extrabold  text-green-400"> </h3>
      <ul className=" justify-center items items-center ">
        {sortedProfilePostsByDate.map(async (post) => (
          <li
            key={`user-${user?.id}`}
            className="flex flex-col justify-center items-center  bg-green-50
            rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
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
                    className="h-50 w-50 flex-none  bg-gray-50"
                    alt="post"
                  />
                ) : null}

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Date: {new Date(post.postTime).toString()}
                </p>

                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post ID: {post.id}{' '}
                </p>
              </Link>
              {(await editPermission(
                post.userId,
                Number(user?.id),
                tokenCooke,
                post.id,
              )) ? (
                <DeletePost
                  id={post.id}
                  PostuserId={post.userId}
                  Token={tokenCooke}
                />
              ) : null}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
