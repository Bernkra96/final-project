import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string } from 'zod';
import { deleteSessionByToken } from '../../../database/sessions';
import {
  deleteUserById,
  getUserBySessionToken,
  updateUserPerUserId,
} from '../../../database/users';
import { User } from '../../../migrations/00000-crateUsersTable';

export type ProfileResponseBodyPost = {
  user: User;
};
{
  {
    message: string;
  }
  [];
}

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<ProfileResponseBodyPost>> {
  const body = await request.json();
  const tokenCookie = cookies().get('sessionToken');
  const cookieToken = tokenCookie?.value;
  const lodeData = body.UserName;
  const userName = lodeData.UserName;
  const id = lodeData.ID;

  const userByToken = await getUserBySessionToken(cookieToken ?? '');

  if (!tokenCookie) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }

  if (!userName) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }
  if (!userByToken) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }

  if (userByToken.username !== userName) {
    return NextResponse.json(
      { errors: [{ message: 'No permission' }] },
      { status: 401 },
    );
  }

  if (userByToken.id !== id) {
    return NextResponse.json(
      { errors: [{ message: 'No permission' }] },
      { status: 401 },
    );
  }

  const delesetUser = await deleteUserById(Number(id));
  if (cookieToken) await deleteSessionByToken(String(cookieToken));
  await cookies().set('sessionToken', '', { maxAge: -1 });

  return NextResponse.json({
    user: delesetUser,
  } as ProfileResponseBodyPost);
}

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<ProfileResponseBodyPost>> {
  const body = await request.json();
  const tokenCookie = cookies().get('sessionToken');
  const cookieToken = tokenCookie?.value;
  const lodeData = body.UserName;
  const userName = lodeData.UserName;
  const id = lodeData.ID;

  const newUserName = body.newUsername;

  if (!cookieToken) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(cookieToken);
  if (!userName) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }

  if (user.username !== userName) {
    return NextResponse.json(
      { errors: [{ message: 'No permission' }] },
      { status: 401 },
    );
  }

  if (user.id !== id) {
    return NextResponse.json(
      { errors: [{ message: 'No permission' }] },
      { status: 401 },
    );
  }
  const updateUser = await updateUserPerUserId(Number(id), newUserName);
  return NextResponse.json({
    user: updateUser,
  } as ProfileResponseBodyPost);
}
