import { cache } from 'sharp';
import { sql } from './connect';

import { User } from './createTableusers';

export type UserWithPasswordHash = User & {
  passordHash: string;
};

export const createUser = cache(
  async (username: string, passordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (username, password_hash)
      VALUES
        (${username.toLowerCase()}, ${passordHash})
      RETURNING
        id,
        username
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
    return user;
  },
);
