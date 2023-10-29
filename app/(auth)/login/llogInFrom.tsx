'use client';

import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { searchParams?: string | string[] };

export default function LoginFrom(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrror] = useState('');

  const router = useRouter();

  async function handelregister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();
    // console.log('Check : ', data);

    if ('errors' in data) {
      setErrror('test');

      return;
    }
    console.log(error);
    console.log(SearchParamsContext);
    // if (props.returnTo) {
    // router.push(props.returnTo);
    // return;
    // }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );
  }

  return (
    <>
      <form onSubmit={async (event) => await handelregister(event)}>
        <label>
          <input onChange={(e) => setUsername(e.currentTarget.value)} />
          User Name
        </label>

        <label>
          <input
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          Password
        </label>

        <button>Regster</button>
      </form>
      <p> {error} </p>
    </>
  );
}
