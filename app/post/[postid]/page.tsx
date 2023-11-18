import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { number } from 'zod';
import {
  getAllComments,
  getCommentByCommentId,
  getCommentsByPostId,
  getCommentsByPostIdwithUserName,
} from '../../../database/commnts';
import { getPostpostidwithUserName } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';
import { editpermiston } from '../../../util/editpermiston';
import DeletePost from '../../newposts/delidepostButton';
import CreateComment from './ceadteCommentFrom';
import CommntDelide from './DelideCommentButton';

export default async function ItemProfilePage(props: {
  params: { postid: any };
}) {
  const itemId = Number(props.params.postid);
  const posts = await getPostpostidwithUserName(itemId);
  const postid = Number(posts[0]?.id);
  const comments = await getCommentsByPostId(postid);

  const tokenCooke = cookies().get('sessionToken');
  const seactionIdUser = String(tokenCooke?.value);
  const user = await getUserBySessionToken(seactionIdUser);
  const userid = Number(user?.id);

  console.log('tokenCookie', tokenCooke, seactionIdUser);

  return (
    <div className=" mx-auto  items-center p-6 lg:px-12  bg-gray-100 max-w-8x1 ">
      <h3 className="mx-auto justify-center p-1 text-center  "> Post</h3>
      <ul className=" justify-center items items-center ">
        {posts.map(async (post) => (
          <li
            key={`post-${post.id}`}
            className="flex flex-col justify-center items-center  bg-green-50
        rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
          >
            <h3 className="mx-auto justify-center p-1 ">{post.title}</h3>
            <p className="mx-auto justify-center p-1 ">{post.post}</p>
            <p className="mx-auto justify-center p-1 "> {post.id}</p>
            {post.image ? (
              <img
                src={post.image}
                className="h-30 w-30 flex-none  bg-gray-50"
                alt="Picture of the author"
              />
            ) : null}

            <Link href={`/profile/${post.username}`}>
              <p className="mx-auto justify-center p-1 ">{post.username}</p>
            </Link>
            <p className="mx-auto justify-center p-1 ">{post.score} </p>
            {(await editpermiston(
              post.userId,
              userid,
              seactionIdUser,
              post.id,
            )) ? (
              <DeletePost
                id={post.id}
                PostuserId={post.userId}
                Token={seactionIdUser}
              />
            ) : null}
          </li>
        ))}
      </ul>
      <CreateComment
        postid={itemId}
        className=" justify-center items items-center "
      />
      <h3 className="mx-auto justify-center p-1 text-center "> Comments</h3>
      <ul className=" justify-center items items-center ">
        {comments.map(async (comment) => (
          <li
            key={`commentid-${comment.id}`}
            className="flex flex-col justify-center items-center  bg-green-50
            rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
          >
            <p className="mx-auto justify-center p-1 ">{comment.id}</p>
            <p className="mx-auto justify-center p-1 ">
              Uder Id :{comment.user_id}
            </p>

            <p className="mx-auto justify-center p-1 ">{comment.post}</p>
            <p>{comment.score}</p>
            {(await editpermiston(
              comment.userId,
              userid,
              seactionIdUser,
              comment.id,
            )) ? (
              <CommntDelide
                id={comment.id}
                userIdPage={comment.user_id}
                Token={seactionIdUser}
                className="mx-auto justify-center p-1 "
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
