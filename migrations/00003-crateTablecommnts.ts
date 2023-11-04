import { Sql } from 'postgres';

export type Comment = {
  postId: number;
  id: number;
  user_id: number;
  post_id: number;
  post: string;
  postTime: number;

  score: number;
};

export async function up(sql: Sql) {
  await sql`
 CREATE TABLE comments (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    post TEXT NOT NULL,
    post_time timestamp NOT NULL DEFAULT NOW(),
    score INTEGER NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE comments
`;
}
