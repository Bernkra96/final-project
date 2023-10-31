import { Sql } from 'postgres';

export type Comment = {
  id: number;
  username: string;
  passwordHash: string;
  score: number;
};

export async function up(sql: Sql) {
  await sql`
 CREATE TABLE comments (
    id BIGINT NOT NULL,
    Userid INTEGER NOT NULL,
    postid BIGINT NOT NULL,
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
