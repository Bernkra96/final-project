import { createUser, getusers } from '../database/users';
import styles from './page.module.css';

export default async function Home() {
  const users = [];

  // users.push(await getusers());

  //  console.log(users);
  return (
    <main className={styles.main}>
      <h1> Main Home </h1>
    </main>
  );
}
