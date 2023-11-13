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
    <>
      <h3> Profle of {params.username}</h3>
      {(await isAdmin(proflieUserid)) ? <p>Is Admin</p> : null}
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

      <h3>UserPosts</h3>
      <ul>
        {profliePosts.map(async (post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.post}</p>
            {post.image ? (
              <Image
                src={post.image}
                width={500}
                height={500}
                unoptimized={true}
                alt="Picture of the author"
              />
            ) : null}
            <p>{post.score} </p>
          </li>
        ))}
      </ul>
    </>
  );
}
