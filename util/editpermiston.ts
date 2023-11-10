import { isArrayBindingElement } from 'typescript';
import { number } from 'zod';
import { getadminbyuserid, isAdmin } from '../database/admins';
import { getUserBySessionToken } from '../database/users';

export async function editpermiston(
  PostuserId: number,
  userId: number,
  Token: string,
  postId: number,
) {
  const loginUser = await getUserBySessionToken(Token);
  const admin = await getadminbyuserid(userId);

  console.log('admin', admin?.start, admin?.level);

  console.log('loginUser', loginUser?.id);

  return loginUser?.id == PostuserId || Number(admin?.level) > 1;
}
