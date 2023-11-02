import { cookies } from 'next/headers';
import React from 'react';
import { createComment } from '../../../database/commnts';
import { getUserBySessionToken } from '../../../database/users';

export default async function CeradepCommnt() {
  const tokenCooke = cookies().get('sessionToken');
  const user = await getUserBySessionToken(tokenCooke.value);
  const userId = user?.id;

  return (
    <>
      <h2> Make New Commnt </h2>
      <form>
        <button>Make Commnt</button>
      </form>
    </>
  );
}
