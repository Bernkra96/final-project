import { cache } from 'react';
import { Comment } from '../migrations/00003-crateTablecommnts';
import { sql } from './connect';

export const createComment = cache(
  async (
    user_id: number,
    post_id: number,

    postText: string,

    score: number,
  ) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO comments
        ( user_id,
          post_id,

        post,


        score)
      VALUES
        ( ${user_id},
          ${post_id},
         ${postText},

          ${score})
      RETURNING
         id,
        user_id,
        post_id,
        post,
        score

    `;

    return comment;
  },
);

export const getAllComments = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT
      *
    FROM
      comments
  `;
  return comments;
});

export const getAllCommentswithUserName = cache(async () => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      comments.post_id,
      comments.post,
      comments.post_time,
      comments.score,
      users.username
    FROM
      comments
    INNER JOIN
      users
    ON
      comments.user_id = users.id
  `;
  return comments;
});

export const getCommentsByPostIdwithUserName = cache(
  async (post_id: number) => {
    const comments = await sql<Comment[]>`
    SELECT
      comments.id,
      comments.user_id,
      comments.post_id,
      comments.post,
      comments.post_time,
      comments.score,
      users.username
    FROM
      comments
    INNER JOIN
      users
    ON
      comments.user_id = users.id
    WHERE
      comments.id = ${post_id}
  `;
    return comments;
  },
);
