import { cache } from 'react';
import { Admin } from '../migrations/00004-crateTableAdmins';
import { sql } from './connect';

///   INSERT INTO admins( user_id,level, ) VALUES( ${user_id}, ${level} );

export const createAdmin = cache(async (user_id: number, level: number) => {
  const [admin] = await sql<Admin[]>`
      INSERT INTO admins
        ( user_id,
          level,
          )
      VALUES
        ( ${user_id},
          ${level}
          )
      RETURNING
         id,
        user_id,
        level,
        start

    `;

  return admin;
});

export const isAdmin = cache(async (user_id: number) => {
  const [admin] = await sql<Admin[]>`
    SELECT
      *
    FROM
      admins
    WHERE
      user_id = ${user_id}
  `;
  return admin;
});

export const getadminbyuserid = cache(async (user_id: number) => {
  const [admin] = await sql<Admin[]>`
    SELECT
      *
    FROM
      admins
    WHERE
      user_id = ${user_id}
  `;
  return admin;
});
