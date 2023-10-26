import { Sql } from 'postgres';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(80) NOT NULL UNIQUE,
    passwordHash varchar(80) NOT NULL);
  `;
}

// CREATE TABLE users (id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,username varchar(80) NOT NULL UNIQUE,pasword_hash varchar(80) NOT NULL);

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
