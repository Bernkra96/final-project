import { cookies } from 'next/headers';
import Link from 'next/link';
import { number } from 'zod';
import { getAllComments } from '../../../database/commnts';
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
  const allcomments = await getAllComments();
  const tokenCooke = cookies().get('sessionToken');
  const user = await getUserBySessionToken(tokenCooke.value);
  const userid = Number(user?.id);
  const SeactionIDUSER = tokenCooke?.value;

  const comments = allcomments.filter((comment) => comment.postId === itemId);
  // await createComment(userid, itemId, 'Test', 0);
  console.log(comments);

  return (
    <>
      <h3> Post</h3>
      <ul>
        {posts.map(async (post) => (
          <li key={`post-${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.post}</p>
            <p>{post.image}</p>
            <Link href={`/profile/${post.username}`}>
              <p>{post.username}</p>
            </Link>
            <p>{post.score} </p>
            {(await editpermiston(
              post.userId,
              userid,
              tokenCooke?.value,
              post.id,
            )) ? (
              <DeletePost
                id={post.id}
                PostuserId={post.userId}
                Token={SeactionIDUSER}
              />
            ) : null}
          </li>
        ))}
      </ul>
      <CreateComment postid={itemId} />
      <h3> Comments</h3>
      <ul>
        {comments.map(async (comment) => (
          <li key={comment.id}>
            <h3>{comment.post}</h3>
            <p>{comment.score} </p>
            {(await editpermiston(
              comment.userId,
              userid,
              tokenCooke?.value,
              comment.id,
            )) ? (
              <CommntDelide
                id={comment.id}
                userIdPage={comment.user_id}
                Token={SeactionIDUSER}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
