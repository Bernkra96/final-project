import { isArrayBindingElement } from 'typescript';
import { number } from 'zod';
import { getAdminByUserId, isAdmin } from '../database/admins';
import { getUserBySessionToken } from '../database/users';

export async function editPermission(
  PostUserId: number,
  userId: number,
  Token: string,
) {
  const loginUser = await getUserBySessionToken(Token);
  const admin = await getAdminByUserId(userId);

  // console.log('admin', admin?.start, admin?.level);

  // console.log('loginUser', loginUser?.id);

  return loginUser?.id === PostUserId || Number(admin?.level) > 1;
}
