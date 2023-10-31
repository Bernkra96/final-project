import { Sql } from 'postgres';

export type Post = {
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
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    post TEXT NULL,
    post_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
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
