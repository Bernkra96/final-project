import { Console } from 'console';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string } from 'zod';
import { deleteSessionByToken } from '../../../database/sessions';
import { DeliteUserbyId, getUserBySessionToken } from '../../../database/users';
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
  const LodeData = body.UserName;
  const userName = LodeData.UserName;
  const id = LodeData.ID;
  const userToken = LodeData.Token;

  console.log('DELIDE Test', body);
  console.log(
    'DELIDE Test02',
    '/',
    LodeData.ID,
    LodeData.UserName,
    LodeData.Token,
  );
  console.log('DELIDE Test03', '/', userName, id, userToken);

  if (!userToken) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(userToken);
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
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  if (user.id !== id) {
    return NextResponse.json(
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  const delesetUser = await DeliteUserbyId(Number(id));
  if (userToken) await deleteSessionByToken(userToken);
  await cookies().set('sessionToken', '', { maxAge: -1 });

  return NextResponse.json({
    user: delesetUser,
  } as ProfileResponseBodyPost);
}

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<ProfileResponseBodyPost>> {
  const body = await request.json();

  const LodeData = body.username;
  const userName = LodeData.username;
  const id = LodeData.ID;
  const userToken = LodeData.Token;

  console.log('Push Test', body);
  console.log('DELIDE Test02', '/ ', LodeData.UserName);
  console.log('Pusch Test03', LodeData, '/');

  if (!userToken) {
    return NextResponse.json(
      { errors: [{ message: 'Session token not found' }] },
      { status: 401 },
    );
  }
  const user = await getUserBySessionToken(userToken);
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
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  if (user.id !== id) {
    return NextResponse.json(
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: body,
  } as ProfileResponseBodyPost);
}
