import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import { deleteCommintByPostId } from '../../../database/commnts';
import {
  createPost,
  deletePost,
  getpostByPostId,
  getUserIdfromPost,
} from '../../../database/posts';
import {
  getUserBySessionToken,
  getUserByUserId,
} from '../../../database/users';
import { Post } from '../../../migrations/00002-crateTablePosts';

export type PostResponseBodyPost = {
  post: Post;
};
{
  {
    message: string;
  }
  [];
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostResponseBodyPost>> {
  const body = await request.json();

  const tokenCookie = cookies().get('sessionToken');
  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(tokenCookie.value);
  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }
  const userId = user.id;

  const newPost = await createPost(
    userId,
    body.title,
    body.post,
    body.Image,
    0,
  );

  if (!newPost) {
    return NextResponse.json(
      { errors: [{ message: 'Failed to create post' }] },
      { status: 500 },
    );
  }

  return NextResponse.json({
    post: newPost,
  } as PostResponseBodyPost);
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<PostResponseBodyPost>> {
  const body = await request.json();
  const userIdPage = body.PostuserId;
  const postId = body.postId;
  console.log('oust id', body);
  console.log('post id2', postId);
  console.log('post id3', userIdPage);

  const userpuostid = await getpostByPostId(postId);

  const tokenCookie = cookies().get('sessionToken');
  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(tokenCookie.value);
  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }
  console.log(
    'post id4',
    user.id,
    userIdPage,
    user.id !== userIdPage,
    userpuostid,
  );

  if (user.id == userIdPage) {
    return NextResponse.json(
      { errors: [{ message: 'Wrong user' }] },
      { status: 401 },
    );
  }
  const deleteCommint = await deleteCommintByPostId(postId);

  const deletetPost = await deletePost(postId);

  return NextResponse.json({
    post: deletetPost,
    deleteCommint,
  } as PostResponseBodyPost);
}
