import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { isAdmin } from '../../../database/admins';
import {
  getPostpostidwithUserName,
  getPostswithUserid,
} from '../../../database/posts';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import { getCookie } from '../../../util/cookies';
import { editpermiston } from '../../../util/editpermiston';
import DeletePost from '../../newposts/delidepostButton';
import DeleteuserButton from './DelideButton';
import EditFrom from './EditFrom';

type Props = {
  params: { username: string };
};

export default async function userProfilePage({ params }: Props) {
  console.log('ceck', params);
  const tokenCooke = await getCookie('sessionToken');
  console.log('tokenCooke', tokenCooke);
  const session = tokenCooke && (await getValidSessionByToken(tokenCooke));
  if (!session) {
    redirect('/');
  }
  const user = await getUserBySessionToken(tokenCooke);

  const proflieUser = await getUserByUsername(params.username);
  const proflieUserid = Number(proflieUser?.id);
  const profliePosts = await getPostswithUserid(Number(proflieUserid));

  // if (!session || user?.username != params.username) {
  //   redirect('/');
  //}

  return (
    <div>
      <h3 className=" items text-center font-extrabold  text-green-400">
        Profle of {params.username}
      </h3>
      {(await isAdmin(proflieUserid)) ? (
        <p className="  items text-center font-extrabold  text-orange-400 ">
          Is Admin
        </p>
      ) : null}
      {(await editpermiston(
        proflieUserid,
        user?.id,
        tokenCooke,
        proflieUserid,
      )) ? (
        <DeleteuserButton
          UserName={params.username}
          ID={user?.id}
          Token={tokenCooke}
        />
      ) : null}

      <h3 className=" items text-center font-extrabold  text-green-400">
        UserPosts
      </h3>
      <ul className=" justify-center items items-center ">
        {profliePosts.map(async (post) => (
          <li
            key={post.id}
            className="flex flex-col justify-center items-center  bg-green-50
            rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
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
                  Post Nr: {post.id}{' '}
                </p>
              </Link>
              {(await editpermiston(
                post.userId,
                user?.id,
                tokenCooke,
                post.id,
              )) ? (
                <DeletePost
                  id={post.id}
                  PostuserId={post.userId}
                  Token={tokenCooke}
                />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
