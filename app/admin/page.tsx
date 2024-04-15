import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { getadminbyuserid, isAdmin } from '../../database/admins';
import { getAllComments } from '../../database/commnts';
import { getAllPosts } from '../../database/posts';
import {
  getnumberOfUsers,
  getnumerofPostsbysingleUser,
  getUserBySessionToken,
  getusers,
} from '../../database/users';
import { getSafeReturnToPath } from '../../util/validation';

export default async function AdminPage() {
  const users = await getusers();
  const nubberofUsers = await getnumberOfUsers();
  const nuberofPosts = await getAllPosts();
  const nuberofComments = await getAllComments();
  const seaaionToken = cookies().get('sessionToken');
  const user = await getUserBySessionToken(seaaionToken?.value || '');
  const userID = user?.id || -1;
  const admin = await isAdmin(Number(userID));
  const adminbyUserID = await getadminbyuserid(Number(userID));
  const adminUserID = adminbyUserID?.userId;

  return Number(adminUserID) === Number(userID) ? (
    // Content to render if the condition is true
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100  rounded-lg  ">
      <h1 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Hallo Admin
      </h1>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {nuberofPosts.length} Posts{' '}
      </h2>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {nuberofComments.length} Comments{' '}
      </h2>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {nubberofUsers?.count} Users{' '}
      </h2>

      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Here are the list of Users{' '}
      </h2>

      <ul className=" justify-center  items-center   bg-green-50  rounded-lg ">
        {users.map(async (user) => (
          <li
            key={`user-${user.id}`}
            className="flex flex-col justify-center items-center  p-3  "
          >
            <section
              className="flex flex-col justify-center items-center  bg-green-100 w-full
           rounded-lg shadow-lg py-5 px-6   "
            >
              <Link
                className="mx-auto justify-center p-6 "
                href={`/profile/${user.username}`}
              >
                <p className="mx-auto justify-center text-center  text-green-700   ">
                  {' '}
                  {user.username}{' '}
                </p>
                <p className="mx-auto justify-center  text-center text-green-700   ">
                  {' '}
                  Nuber of Posts{' '}
                  {
                    nuberofPosts.filter(
                      (post) => Number(post.userId) === Number(user.id),
                    ).length
                  }{' '}
                </p>
                <p className="mx-auto justify-center text-center  text-green-700   ">
                  {' '}
                  Nuber of Comments{' '}
                  {
                    nuberofComments.filter(
                      (comment) => Number(comment.userId) === Number(user.id),
                    ).length
                  }{' '}
                </p>

                <p className="mx-auto justify-center text-center   text-green-700   ">
                  {' '}
                  User ID {user.id}{' '}
                </p>

                {(await isAdmin(user.id)) ? (
                  <p className="  items text-center font-extrabold  text-orange-400 ">
                    Is Admin
                  </p>
                ) : null}
              </Link>
            </section>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
}
