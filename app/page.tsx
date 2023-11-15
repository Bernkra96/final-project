import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import {
  getAllComments,
  getAllCommentswithUserName,
  getCommentsByPostIdwithUserName,
} from '../database/commnts';
import { createUser, getUserBySessionToken, getusers } from '../database/users';
import { setCloudinaryEnvVars } from '../util/cloudinary';
import LoginPage from './(auth)/login/page';
import RegisterPage from './(auth)/register/page';
import NewPostsPage from './newposts/page';

export default async function Home() {
  const tokenSeession = cookies().get('sessionToken'); // get sessionToken from cookies
  console.log('tokenSeession', tokenSeession);
  // get  user from database by sessionToken

  const user =
    tokenSeession && (await getUserBySessionToken(tokenSeession.value));

  // chanege bedewen login/register and newposts

  return (
    <main>
      <h1> Main Home </h1>

      {user ? (
        <NewPostsPage />
      ) : (
        <>
          Register
          <RegisterPage />
          <br />
          Login
          <LoginPage />
        </>
      )}
    </main>
  );
}
