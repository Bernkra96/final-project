import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import router from 'next/router';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import {
  createComment,
  deleteCommintByCommentId,
  deleteCommintByPostId,
} from '../../../database/commnts';
import { getpostByPostId } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';

export type CommentResponseBodyPost = {
  comment: Comment;
};
{
  errors: {
    message: string;
  }
  [];
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentResponseBodyPost>> {
  const body = await request.json();
  console.log(body);
  const postid = body.postid.postid;
  console.log(postid);
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

  const newComment = await createComment(userId, postid, body.post, 0);

  if (!newComment) {
    return NextResponse.json(
      { errors: [{ message: 'Failed to create post' }] },
      { status: 500 },
    );
  }

  return NextResponse.json({
    comment: newComment,
  } as CommentResponseBodyPost);
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<CommentResponseBodyPost>> {
  const body = await request.json();
  const userIdPage = body.id;
  const postId = body.postId;
  let commentId = body.commentId;

  console.log('id', body);
  console.log('id2', postId);
  console.log('id3', userIdPage);
  console.log('id3', commentId);

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
  commentId = user.id;
  console.log(
    'id4',
    user.id,
    userIdPage,
    user.id !== userIdPage,
    userpuostid,

    commentId,
  );

  const deleteCommint = await deleteCommintByCommentId(Number(userIdPage.id));
  console.log('id5', deleteCommint);
  return NextResponse.json({
    comment: deleteCommint,
  } as unknown as CommentResponseBodyPost);
}
