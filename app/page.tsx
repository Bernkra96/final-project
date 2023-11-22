import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import Link from 'next/link';
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
    <main className=" mx-auto flex max-w-7xl items-center justify-between p-6 ">
      <section className="mx-auto justify-between p-6 lg:px-4 ">
        {user ? (
          <NewPostsPage />
        ) : (
          <>
            <h1 className=" items text-center font-extrabold  text-green-400">
              {' '}
              Welcomme to CanvasView{' '}
            </h1>
            <br />
            <p className="mt-1 block font-semibold text-green-500 mx-auto justify-center p-1 ">
              {' '}
              Share Your World: Connect, Create, and Inspire Through Shared
              Visuals and Words.
            </p>

            <br />
            <p className=" items text-center font-extrabold  text-green-400">
              Login
            </p>
            <LoginPage />

            <br />

            <Link
              href="/register"
              className=" justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Register
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
