import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { string, z } from 'zod';
import { isAdmin } from '../../../database/admins';
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
import { editpermiston } from '../../../util/editpermiston';

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
  console.log('post id', body);

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
  console.log('oust id', body);
  console.log('oust id1', sideData);
  console.log('post id2'), sideData.PostuserId;
  console.log('post id3', userIdPage);
  console.log('post id3.5', tokenFromPage);

  const userpuostid = await getpostByPostId(postId);
  console.log('post id3.6', userpuostid[0]);
  const tokenCookie = cookies().get('sessionToken');
  const cookieToken = tokenCookie?.value;
  console.log('post id3.7', tokenCookie, cookieToken);
  const user = await getUserBySessionToken(cookieToken);
  const admin = await isAdmin(user.id);
  const permission = await editpermiston(
    userIdPage,
    user?.id,
    tokenFromPage,
    postId,
  );
  console.log('post id3.8', user.id, admin?.user_id);
  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }
  const userID = user.id;
  console.log(
    'post id4',
    user.id,
    userIdPage.toString(),
    userID !== userIdPage,
    userpuostid.user_id,
    admin?.level > 1,
  );
  if (!admin?.level && Number(admin?.level) > 1) {
    if (userID !== userIdPage) {
      return NextResponse.json(
        { errors: [{ message: 'Wrong user USEU ID' }] },
        { status: 401 },
      );
    }

    if (cookieToken !== tokenFromPage) {
      return NextResponse.json(
        { errors: [{ message: 'Wrong user Tocken' }] },
        { status: 401 },
      );
    }
  }
  const deleteCommint = await deleteCommintByPostId(postId);

  const deletetPost = await deletePost(postId);

  return NextResponse.json({
    post: deletetPost,
    deleteCommint,
  } as PostResponseBodyPost);
}
