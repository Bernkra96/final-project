import Link from 'next/link';
import { isAdmin } from '../../database/admins';
import {
  getnumberOfUsers,
  getnumerofPostsbysingleUser,
  getusers,
} from '../../database/users';

export default async function AdminPage() {
  const users = await getusers();
  const nubberofUsers = await getnumberOfUsers();

  return (
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100 ">
      <h1 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Hallo Admin{' '}
      </h1>
      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        There are {nubberofUsers?.count} users{' '}
      </h2>

      <h2 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Here are the list of users{' '}
      </h2>

      <ul className=" justify-center items items-center ">
        {users.map(async (user) => (
          <li
            key={`user-${user.id}`}
            className="flex flex-col justify-center items-center  bg-green-50"
          >
            <section
              className="flex flex-col justify-center items-center  bg-green-100 w-full
             rounded-lg shadow-lg py-5 px-6 "
            >
              <Link
                className="mx-auto justify-center p-6 lg:px-4 "
                href={`/profile/${user.username}`}
              >
                <p className="mx-auto justify-center   text-green-700   ">
                  {' '}
                  {user.username}{' '}
                </p>

                <p className="mx-auto justify-center   text-green-700   ">
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
  );
}
