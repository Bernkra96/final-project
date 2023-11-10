import { Sql } from 'postgres';

export type Admin = {
  id: number;
  user_id: number;
  level: number;
  start: number;
};

export async function up(sql: Sql) {
  await sql`
 CREATE TABLE admins(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    level INTEGER NOT NULL,
    start TIMESTAMP NOT NULL DEFAULT NOW()
    );
 `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE admins
  `;
}
