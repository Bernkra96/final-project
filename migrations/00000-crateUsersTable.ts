import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  score: number;
  firstLogin: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    password_hash varchar(80) NOT NULL,
    score INTEGER NOT NULL,
    fitstlogin timestamp NOT NULL DEFAULT NOW() );
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}
