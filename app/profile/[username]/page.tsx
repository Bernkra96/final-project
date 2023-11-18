import Image from 'next/image';
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
  const proflieUserid = proflieUser?.id;
  const profliePosts = await getPostswithUserid(Number(proflieUserid));

  // if (!session || user?.username != params.username) {
  //   redirect('/');
  //}

  return (
    <div className=" mx-auto  max-w-7xl items-center p-6   bg-gray-100 ">
      <h3 className=" items text-center font-extrabold  text-green-400">
        {' '}
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
            <h3 className="mx-auto justify-center p-1 ">{post.title}</h3>
            <p className="mx-auto justify-center p-1 ">{post.post}</p>
            {post.image ? (
              <img
                src={post.image}
                className="h-50 w-50 flex-none  bg-gray-50"
                alt="Picture of the author"
              />
            ) : null}
            <p>{post.score} </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
