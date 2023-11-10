import { isAdmin } from '../../database/admins';
import { getusers } from '../../database/users';

export default async function AdminPage() {
  const users = await getusers();

  return (
    <>
      <h1> Admin Panal </h1>
      <ul>
        {users.map(async (user) => (
          <li key={`user-${user.id}`}>
            <h3>{user.username}</h3>
            {(await isAdmin(user.id)) ? <p>Is Admin</p> : null}
            <p>{user.id} </p>
          </li>
        ))}
      </ul>
    </>
  );
}
