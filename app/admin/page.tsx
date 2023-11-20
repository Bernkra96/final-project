import Link from 'next/link';
import { isAdmin } from '../../database/admins';
import { getusers } from '../../database/users';

export default async function AdminPage() {
  const users = await getusers();

  return (
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100 ">
      <h1 className="mx-auto justify-center p-1  flex font-semibold text-gray-900 ">
        {' '}
        Admin Panal{' '}
      </h1>
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
                <p className="mx-auto justify-center p-1  text-green-700   ">
                  {' '}
                  {user.username}{' '}
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
