import { Sql } from 'postgres';

export type Comment = {
  id: number;
  userId: number;
  post: string;
  postTime: number;
  postId: number;
  score: number;
};

export async function up(sql: Sql) {
  await sql`
 CREATE TABLE comments (
    id BIGINT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id BIGINT NOT NULL,
    post TEXT NOT NULL,
    post_time TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    score INTEGER NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE comments
`;
}
