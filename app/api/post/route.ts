import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import { createPost } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';
import { Post } from '../../../migrations/00002-crateTablePosts';

export type PostResponseBodyPost = {
  post: Post;
};
{
  errors: {
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
