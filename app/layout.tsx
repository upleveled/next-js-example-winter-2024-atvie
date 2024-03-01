import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUser } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';
import CookieBanner from './CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Home page | UpLeveled',
    template: '%s | UpLeveled',
  },
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Task: Display the logged in user's username in the navigation bar and hide the login and register links depending on whether the user is logged in or not

  // 1. Checking if the sessionToken cookie exists
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. Get the current logged in user from the database using the sessionToken value
  const user = sessionToken && (await getUser(sessionToken.value));

  // 3. Make decision whether to show the login and register links or not

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <div>
            <CookieBanner />
            <nav>
              {/* This is not optimized */}
              {/* <a href="/">Home</a> */}
              {/* This is optimized */}
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/animals">Animals</Link>
              <Link href="/animals/dashboard">Dashboard</Link>
              <Link href="/fruits">Fruits</Link>

              <div>
                {user ? (
                  <>
                    <Link href="/notes">Notes</Link>
                    <Link href={`/profile/${user.username}`}>
                      {user.username}
                    </Link>
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                  </>
                )}
              </div>
            </nav>

            {Math.floor(Math.random() * 10)}
          </div>
        </header>
        <main>{children}</main>
        <footer>Hello Footer</footer>
      </body>
    </html>
  );
}
