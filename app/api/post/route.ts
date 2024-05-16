import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string } from 'zod';
import { isAdmin } from '../../../database/admins';
import { deleteCommentByPostId } from '../../../database/commnts';
import { createPost, deletePost } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';
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
    body.image,
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
  const sideData = body.id;
  const userIdPage = sideData.PostuserId;
  const postId = sideData.id;
  const tokenFromPage = sideData.Token;

  const tokenCookie = cookies().get('sessionToken');
  const cookieToken = tokenCookie?.value;

  if (!tokenCookie || !cookieToken) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(cookieToken);
  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }
  const admin = await isAdmin(user.id);

  if (!admin) {
    return NextResponse.json(
      { errors: [{ message: 'Admin not found' }] },
      { status: 401 },
    );
  }

  const userID = user.id;

  if (!admin?.level && Number(admin?.level) > 1) {
    if (userID !== userIdPage) {
      return NextResponse.json(
        { errors: [{ message: 'Wrong user ID' }] },
        { status: 401 },
      );
    }

    if (cookieToken !== tokenFromPage) {
      return NextResponse.json(
        { errors: [{ message: 'Wrong user Token' }] },
        { status: 401 },
      );
    }
  }
  const deleteCommit = await deleteCommentByPostId(postId);

  const deletePostPerId = await deletePost(postId);

  return NextResponse.json({
    post: deletePostPerId,
    deleteCommint: deleteCommit,
  } as PostResponseBodyPost);
}
