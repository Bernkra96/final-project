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
    <main className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-0 ">
      <div className="mx-auto justify-between p-6 lg:px-4 ">
        <h1 className="mx-auto justify-center p-6 lg:px-4 "> Main Home </h1>

        {user ? (
          <NewPostsPage />
        ) : (
          <>
            <p className="mx-auto justify-center p-1 ">Register</p>
            <RegisterPage />
            <br />
            <p className="mx-auto justify-center p-1 ">Login</p>
            <LoginPage />
          </>
        )}
      </div>
    </main>
  );
}
