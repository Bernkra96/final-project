import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/logoutButton';

const inter = Inter({ subsets: ['latin'] });

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

  console.log('tokenSeession user', user);

  return (
    <html lang="en">
      <body className={inter.className}>
        {' '}
        <nav>
          <div>
            {' '}
            <Link href="/">Home</Link>{' '}
          </div>
          <div>
            {user ? (
              <>
                <div> Hallo {user.username}</div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register">Register </Link>
                <Link href="/login">Log in</Link>{' '}
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
