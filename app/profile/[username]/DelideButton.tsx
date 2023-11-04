import { cookies } from 'next/headers';
import React from 'react';
import { ProfileResponseBodyPost } from '../../api/profile/route';

type Props = { searchParams?: string | string[] };

export default function DeleteuserButton(props: Props) {
  async function handeldele(event: React.FormEvent<HTMLFormElement>) {
    const token = await cookies().get('sessionToken');
    event.preventDefault();
    console.log('token', token);

    const response = await fetch('/api/profile', {
      method: 'DELETE',
      body: JSON.stringify({
        token,
      }),
    });

    const data: ProfileResponseBodyPost = await response.json();
    console.log('Check : ', data);
  }

  return (
    <form onSubmit={handeldele}>
      <button type="submit">Delete User</button>
    </form>
  );
}
