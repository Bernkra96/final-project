import { cookies } from 'next/headers';
import Link from 'next/link';
import { getCommentsByPostIdwithUserName } from '../../../database/commnts';
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
  const postId = Number(posts[0]?.id);
  const comments = await getCommentsByPostIdwithUserName(postId);

  const tokenCooke = cookies().get('sessionToken');
  const sectionIdUser = String(tokenCooke?.value);
  const user = await getUserBySessionToken(sectionIdUser);
  const userId = Number(user?.id);

  // console.log('tokenCookie', tokenCooke, seactionIdUser);
  // console.log(comments);
  return (
    <section className=" mx-auto  max-w-7xl items-center p-6 lg:px-8  rounded-lg  bg-green-100 ">
      <h3 className="items text-center font-extrabold  text-green-400 ">
        {' '}
        Post
      </h3>
      <ul className=" justify-center items items-center ">
        {posts.map(async (post) => (
          <li
            key={`post-${post.id}`}
            className="flex flex-col justify-center items-center  rounded-lg bg-green-50
            py-5 px-6 sm:py-6 sm:px-10"
          >
            <section
              className="flex flex-col justify-center items-center  bg-green-100 w-full
             rounded-lg shadow-lg py-5 px-6 "
            >
              <h3 className=" items text-center font-extrabold  text-green-400">
                {post.title}
              </h3>
              <p className="mx-auto justify-center p-1 ">{post.post}</p>
              <p className="mx-auto justify-center p-1  text-green-700   ">
                {' '}
                Post ID: {post.id}
              </p>
              {post.image ? (
                <img
                  src={post.image}
                  className="h-30 w-30 flex-none bg-gray-50"
                  alt=""
                />
              ) : null}

              <Link href={`/profile/${post.username}`}>
                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Post by {post.username}
                </p>
              </Link>

              {(await editpermiston(
                post.userId,
                userId,
                sectionIdUser,
                post.id,
              )) ? (
                <DeletePost
                  id={post.id}
                  PostuserId={post.userId}
                  Token={sectionIdUser}
                />
              ) : null}
            </section>
          </li>
        ))}
      </ul>

      <CreateComment
        postid={itemId}
        className=" justify-center items items-center "
      />
      <h3 className="items text-center font-extrabold  text-green-400">
        {' '}
        Comments
      </h3>
      <h3 className="items text-center font-extrabold  text-green-400">
        {' '}
        Number of Comments: {comments.length}{' '}
      </h3>
      <ul className=" justify-center items items-center ">
        {comments.map(async (comment) => (
          <li
            key={`commentid-${comment.id}`}
            className="flex flex-col justify-center items-center  bg-green-50
            rounded-lg shadow-lg py-5 px-6 sm:py-6 sm:px-10"
          >
            <section
              className="flex flex-col justify-center items-center  bg-green-100 w-full

              rounded-lg shadow-lg py-5 px-6 "
            >
              <p className="mx-auto justify-center text-center p-1 ">
                {comment.post}
              </p>

              <p className="mx-auto justify-center p-1 text-center text-green-700   ">
                Comment ID: {comment.id}
              </p>
              <Link href={`/profile/${comment.username}`}>
                <p className="mx-auto justify-center p-1 text-center  text-green-700   ">
                  Comment by {comment.username}
                </p>

                <p className="mx-auto justify-center text-center p-1  text-green-700   ">
                  User ID: {String(comment.userId)}
                </p>
              </Link>

              {(await editpermiston(
                Number(comment.userId),
                userId,
                sectionIdUser,
                comment.id,
              )) ? (
                <CommntDelide
                  id={comment.id}
                  userIdPage={comment.user_id}
                  Token={sectionIdUser}
                  className="mx-auto justify-center p-1 "
                />
              ) : null}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
