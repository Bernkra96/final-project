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
  getCommentByCommentId,
  getUserIdperCommentId,
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
  const postID = body.postid.postid;
  console.log(postID);
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

  const newComment = await createComment(userId, postID, body.post, 0);

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
  const userIdPage = body.id.userIdPage;
  const postId = body.postId;
  let commentId = body.id.id;

  console.log('id01', body);
  console.log('id2', postId);
  console.log('id3', userIdPage);
  console.log('id3', commentId);

  const commentData = await getCommentByCommentId(commentId);

  console.log('id3.5', commentData[0].userId);
  const commentuserId = await getUserIdperCommentId(commentId);

  console.log('id3.5.5', commentuserId);
  const tokenCookie = cookies().get('sessionToken');
  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] } as {
        errors: { message: string }[];
      },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(tokenCookie.value);
  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] } as {
        errors: { message: string }[];
      },
      { status: 401 },
    );
  }
  const userId = user.id;

  const comment = await getCommentByCommentId(commentId);

  if (comment.length === 0) {
    return NextResponse.json(
      { errors: [{ message: 'Comment not found' }] } as {
        errors: { message: string }[];
      },
      { status: 404 },
    );
  }

  const commentUserId = commentData[0].userId;

  if (userId !== commentUserId) {
    return NextResponse.json(
      { errors: [{ message: 'No permission' }] } as {
        errors: { message: string }[];
      },
      { status: 401 },
    );
  }

  const deleteCommint = await deleteCommintByCommentId(commentId);

  return NextResponse.json({
    comment: deleteCommint,
  } as CommentResponseBodyPost);
}
