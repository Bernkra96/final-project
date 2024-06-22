import { isArrayBindingElement } from 'typescript';
import { number } from 'zod';
import { getAdminByUserId, isAdmin } from '../database/admins';
import { getUserBySessionToken } from '../database/users';

/**
 * Edits the permission for a user to perform an action.
 * @param {number} PostUserId - The ID of the user who posted the content.
 * @param {number} userId - The ID of the user whose permission is being edited.
 * @param {string} Token - The session token of the logged-in user.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the user has permission to perform the action.
 */
export async function editPermission(
  PostUserId: number,
  userId: number,
  Token: string,
) {
  const loginUser = await getUserBySessionToken(Token);
  const admin = await getAdminByUserId(userId);

  // console.log('admin', admin?.start, admin?.level);

  // console.log('loginUser', loginUser?.id);

  return (
    Number(loginUser?.id) === Number(PostUserId) || Number(admin?.level) > 1
  );
}
