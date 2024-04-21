import { cookies } from 'next/headers';
import Link from 'next/link';
import { getadminbyuserid, isAdmin } from '../../database/admins';
import { getAllComments } from '../../database/commnts';
import { getAllPosts } from '../../database/posts';
import {
  getnumberOfUsers,
  getUserBySessionToken,
  getusers,
} from '../../database/users';

export default async function AdminPage() {
  const users = await getusers();
  const numberUsers = await getnumberOfUsers();
  const numberPosts = await getAllPosts();
  const numberComments = await getAllComments();
  const seasonToken = cookies().get('sessionToken');
  const user = await getUserBySessionToken(seasonToken?.value || '');
  const userID = user?.id || -1;

  const adminByUserID = await getadminbyuserid(Number(userID));
  const adminUserID = adminByUserID?.userId;

  return Number(adminUserID) === Number(userID) ? (
    // Content to render if the condition is true
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100  rounded-lg  ">
      <h1 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Hallo Admin
      </h1>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {numberPosts.length} Posts{' '}
      </h2>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {numberComments.length} Comments{' '}
      </h2>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {numberUsers?.count} Users{' '}
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
                  Number of Posts{' '}
                  {
                    numberPosts.filter(
                      (post) => Number(post.userId) === Number(user.id),
                    ).length
                  }{' '}
                </p>
                <p className="mx-auto justify-center text-center  text-green-700   ">
                  {' '}
                  Number of Comments{' '}
                  {
                    numberComments.filter(
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
