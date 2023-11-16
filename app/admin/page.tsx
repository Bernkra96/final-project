import { isAdmin } from '../../database/admins';
import { getusers } from '../../database/users';

export default async function AdminPage() {
  const users = await getusers();

  return (
    <div className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  bg-gray-100 ">
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
            <h3 className="mx-auto justify-center p-1 ">{user.username}</h3>
            {(await isAdmin(user.id)) ? (
              <p className="mx-auto justify-center p-1  block font-semibold text-gray-900 ">
                Is Admin
              </p>
            ) : null}
            <p className="mx-auto justify-center p-1  block font-semibold text-gray-900 ">
              {user.id}{' '}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
