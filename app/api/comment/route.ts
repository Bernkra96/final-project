import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string } from 'zod';
import { isAdmin } from '../../../database/admins';
import {
  createComment,
  deleteCommentByCommentId,
  getCommentByCommentId,
} from '../../../database/commnts';
import { getPostByPostId } from '../../../database/posts';
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

  const postID = body.postid.postid;

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

  const commentId = body.id.id;
  const user = await getUserBySessionToken(body.id.Token);
  const admin = await isAdmin(user.id);

  const commentData = await getCommentByCommentId(commentId);

  const tokenCookie = cookies().get('sessionToken');
  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] } as {
        errors: { message: string }[];
      },
      { status: 401 },
    );
  }
  if (!admin?.level > 1) {
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
  }
  const deleteCommint = await deleteCommentByCommentId(commentId);

  return NextResponse.json({
    comment: deleteCommint,
  } as CommentResponseBodyPost);
}
