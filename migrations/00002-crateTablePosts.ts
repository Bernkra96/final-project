import { Sql } from 'postgres';

export type Post = {
  username: string;
  id: number;
  userId: number;

  title: string;
  post: string;
  postTime: number;
  image: string;
  score: number;
};

export async function up(sql: Sql) {
  await sql`
CREATE TABLE posts(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    post TEXT NULL,
    post_time timestamp NOT NULL DEFAULT NOW(),
    image TEXT NULL,
    score INTEGER NOT NULL
);
  `;
}
export async function down(sql: Sql) {
  await sql`
DROP TABLE posts
`;
}
