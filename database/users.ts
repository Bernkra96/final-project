import { cache } from 'react';
import { sql } from './connect';
import { User } from './createTableusers';

export type UserWithPasswordHash = User & {
  passordHash: string;
};

export type UserNote = {
  noteId: number;
  textContent: string;
  username: string;
};

export const createUser = cache(
  async (username: string, passwordHash: string, score: number) => {
    const [user] = await sql<User[]>`
      INSERT INTO users
        (username, password_hash, score)
      VALUES
        (${username.toLowerCase()}, ${passwordHash}, ${score})
      RETURNING
        id,
        username,
        score
    `;
    return user;
  },
);

export const getusers = cache(async () => {
  const users = await sql<User[]>`
    SELECT
     id,
     username,
    FROM
      users
  `;
  return users;
});

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

export const getUserByUserId = cache(async (userId: number) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${userId}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        username,
        password_hash "paswordHash"
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
   SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const deleteUserbyName = cache(async (username: string) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    DELETE FROM
      users
    WHERE
      users.username = ${username}


  `;
  return user;
});

export const updateUser = cache(
  async (oldUsername: string, username: string) => {
    const [user] = await sql<User[]>`
    UPDATE users
    SET
     username= ${username}
    WHERE
      username= ${oldUsername},
    RETURNING  id,
        username
  `;
    return user;
  },
);

export const DeliteUserbyId = cache(async (id: number) => {
  const [user] = await sql<{ id: number; username: string }[]>`
    DELETE FROM
      users
    WHERE
      users.id = ${id}
  `;
  return user;
});
