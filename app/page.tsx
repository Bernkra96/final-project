import { v2 as cloudinary } from 'cloudinary';
import {
  getAllComments,
  getAllCommentswithUserName,
  getCommentsByPostIdwithUserName,
} from '../database/commnts';
import { createUser, getusers } from '../database/users';
import { setCloudinaryEnvVars } from '../util/cloudinary';
import NewPostsPage from './newposts/page';
import styles from './page.module.css';

setCloudinaryEnvVars();
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function Home() {
  // const allcomments = await getAllComments();
  /// const allcommentsuserbname = await /// getAllCommentswithUserName();
  // const commentsidwithusername = await getCommentsByPostIdwithUserName(5);

  //  cost users = await getusers();
  // console.log(allcomments);
  /// console.log(allcommentsuserbname);
  // console.log(commentsidwithusername);
  //  console.log(users);
  return (
    <main className={styles.main}>
      <h1> Main Home </h1>
    </main>
  );
}
