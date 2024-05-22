import { cookies } from 'next/headers';
import Link from 'next/link';
import { getCommentsByPostIdWithUserName } from '../../../database/commnts';
import { getPostWithUserIdAndUsername } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';
import { editPermission } from '../../../util/editpermiston';
import DeletePost from '../../newposts/delidepostButton';
import CreateComment from './ceadteCommentFrom';
import CommntDelide from './DelideCommentButton';

export default async function ItemProfilePage(props: {
  params: { postid: any };
}) {
  const itemId = Number(props.params.postid);
  const posts = await getPostWithUserIdAndUsername(itemId);
  const postId = Number(posts[0]?.id);
  const comments = await getCommentsByPostIdWithUserName(postId);

  const tokenCooke = cookies().get('sessionToken');
  const sectionIdUser = String(tokenCooke?.value);
  const user = await getUserBySessionToken(sectionIdUser);
  const userId = Number(user?.id);
  const sortedCommentsByDate = comments.sort(function (a, b) {
    const dateA = new Date(a.postTime).getTime();
    const dateB = new Date(b.postTime).getTime();
    return dateB - dateA;
  });
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
              <p className="mx-auto justify-center p-1  text-green-700   ">
                Date: {new Date(post.postTime).toString()}
              </p>
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

              {user ? (
                <>
                  {' '}
                  {(await editPermission(
                    post.userId,
                    userId,
                    sectionIdUser,
                  )) ? (
                    <DeletePost
                      id={post.id}
                      PostUserId={post.userId}
                      Token={sectionIdUser}
                    />
                  ) : null}
                </>
              ) : null}
            </section>
          </li>
        ))}
      </ul>

      {user ? (
        <CreateComment
          postid={itemId}
          className=" justify-center items items-center "
        />
      ) : (
        <h2 className=" items text-center font-extrabold  text-red-400">
          Login / Register to Comment
        </h2>
      )}

      <h3 className="items text-center font-extrabold  text-green-400">
        {' '}
        Comments
      </h3>
      <h3 className="items text-center font-extrabold  text-green-400">
        {' '}
        Number of Comments: {comments.length}{' '}
      </h3>
      <ul className=" justify-center items items-center ">
        {sortedCommentsByDate.map(async (comment) => (
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
                <p className="mx-auto justify-center p-1  text-green-700   ">
                  Date: {new Date(comment.postTime).toString()}
                </p>

                <p className="mx-auto justify-center text-center p-1  text-green-700   ">
                  User ID: {String(comment.userId)}
                </p>
              </Link>
              {user ? (
                <>
                  {' '}
                  {(await editPermission(
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
                </>
              ) : null}
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
