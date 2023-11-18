import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { isAdmin } from '../database/admins';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/logoutButton';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
type Props = { children: ReactNode };
export default async function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode;
  },
  props: Props,
) {
  const cookieStore = cookies();
  const tokenSeession = cookies().get('sessionToken');
  console.log('tokenSeession', tokenSeession);

  const user =
    tokenSeession && (await getUserBySessionToken(tokenSeession.value));
  const isadmin = await isAdmin(user?.id);
  console.log('tokenSeession user', user);

  return (
    <html lang="en">
      <body>
        <header className="bg-white" aria-label="Global">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 ">
            <div className="mx-auto  p-6 ">
              <Link
                href="/"
                className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Home
              </Link>
            </div>
            <div className="mx-auto flex   p-6 ">
              {user ? (
                <>
                  <div className="mt-1 block font-semibold text-green-500 mx-auto justify-center p-1 ">
                    Hallo {user.username}
                  </div>
                  <LogoutButton />
                  <Link
                    href={`/profile/${user.username}`}
                    className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/newposts"
                    className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Newposts
                  </Link>
                  {isadmin ? (
                    <Link
                      href="/admin"
                      className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                      Admin
                    </Link>
                  ) : null}
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="  flex justify-center rounded-md bg-green-600 px-3 py-1.5 p-6  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>
      </body>
      {children}
    </html>
  );
}
