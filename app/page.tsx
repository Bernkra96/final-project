import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { v2 as cloudinary } from 'cloudinary';
import { Image } from 'next/image';
import {
  getAllComments,
  getAllCommentswithUserName,
  getCommentsByPostIdwithUserName,
} from '../database/commnts';
import { createUser, getusers } from '../database/users';
import NewPostsPage from './newposts/page';
import styles from './page.module.css';

export default async function Home() {
  // const allcomments = await getAllComments();
  /// const allcommentsuserbname = await /// getAllCommentswithUserName();
  // const commentsidwithusername = await getCommentsByPostIdwithUserName(5);
  const myImage = new CloudinaryImage('sample').resize(
    fill().width(100).height(150),
  );

  //  const users = await getusers();
  // console.log(allcomments);
  /// console.log(allcommentsuserbname);
  // console.log(commentsidwithusername);
  //  console.log(users);
  return (
    <main className={styles.main}>
      <h1> Main Home </h1>
      <NewPostsPage />
    </main>
  );
}
