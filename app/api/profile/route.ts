import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { string } from 'zod';
import { isAdmin } from '../../../database/admins';
import { deleteSessionByToken } from '../../../database/sessions';
import {
  DeliteUserbyId,
  getUserBySessionToken,
  updateUser,
  updateUserperUderId,
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
  const LodeData = body.UserName;
  const userName = LodeData.UserName;
  const id = LodeData.ID;
  const userToken = LodeData.Token;
  const userByToken = await getUserBySessionToken(cookieToken ?? '');

  // console.log('commnt id3.8', userByToken?.id, admin?.user_id);

  // console.log('DELIDE Test', body);
  // console.log(
  // 'DELIDE Test02',
  //  '/',
  // LodeData.ID,
  // LodeData.UserName,
  // LodeData.Token,
  // );
  // console.log('DELIDE Test03', '/', userName, id, userToken);

  if (!tokenCookie) {
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
  if (!userByToken) {
    return NextResponse.json(
      { errors: [{ message: 'User not found' }] },
      { status: 401 },
    );
  }

  if (userByToken.username !== userName) {
    return NextResponse.json(
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  if (userByToken.id !== id) {
    return NextResponse.json(
      { errors: [{ message: 'No pemiston' }] },
      { status: 401 },
    );
  }

  const delesetUser = await DeliteUserbyId(Number(id));
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
  const LodeData = body.UserName;
  const userName = LodeData.UserName;
  const id = LodeData.ID;
  const userToken = LodeData.Token;
  const newUserName = body.newUsername;

  //  console.log('Push Test', body);
  // console.log('push Test02', '/ ', LodeData.UserName);
  // console.log('Pusch Test03', LodeData, '/');
  // console.log('Pusch Test04', '/', userName, id, userToken, newUserName);

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
  const updateUser = await updateUserperUderId(Number(id), newUserName);
  return NextResponse.json({
    user: updateUser,
  } as ProfileResponseBodyPost);
}
