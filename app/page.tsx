import { up } from '../database/createTableusers';
import { createUser, getusers } from '../database/users';
import styles from './page.module.css';

export default async function Home() {
  return <main className={styles.main}>Hallo</main>;
}
