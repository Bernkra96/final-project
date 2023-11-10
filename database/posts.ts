import { cache } from 'react';
import { Post } from '../migrations/00002-crateTablePosts';
import { sql } from './connect';

export const createPost = cache(
  async (
    user_id: number,
    title: string,
    postText: string,
    image: string,
    score: number,
  ) => {
    const [post] = await sql<Post[]>`
      INSERT INTO posts
        ( user_id,
        title,
        post,

        image,
        score)
      VALUES
        ( ${user_id},
    ${title},
    ${postText},
    ${image},
    ${score})
      RETURNING
        id,

        user_id,
        title,
        post,
        post_time,
        image,
        score


    `;

    return post;
  },
);

export const getAllPosts = cache(async () => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
  `;
  return posts;
});
//  SELECT       *    FROM     posts;
export const getpostByPostId = cache(async (postid: number) => {
  const post = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${postid}
  `;
  return post;
});

export const getAllPostswithUserName = cache(async () => {
  const posts = await sql<Post[]>`
    SELECT
      posts.id,
      posts.user_id,
      posts.title,
      posts.post,
      posts.post_time,
      posts.image,
      posts.score,
      users.username
    FROM
      posts
    INNER JOIN users ON posts.user_id = users.id
  `;
  return posts;
});

export const getPostpostidwithUserName = cache(async (postid: number) => {
  const post = await sql<Post[]>`
    SELECT
      posts.id,
      posts.user_id,
      posts.title,
      posts.post,
      posts.post_time,
      posts.image,
      posts.score,
      users.username
    FROM
      posts
    INNER JOIN users ON posts.user_id = users.id
    WHERE
      posts.id = ${postid}
  `;
  return post;
});

export const getPostswithUserid = cache(async (userid: number) => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      user_id = ${userid}
  `;
  return posts;
});

export const getUserIdfromPost = cache(async (postid: number) => {
  const post = await sql<Post[]>`
    SELECT
      user_id
    FROM
      posts
    WHERE
      id = ${postid}
  `;
  return post;
});

export const deletePost = cache(async (postid: number) => {
  const post = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      id = ${postid}
  `;
  return post;
});
