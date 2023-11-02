import { cookies } from 'next/headers';
import Link from 'next/link';
import { createComment, getAllComments } from '../../../database/commnts';
import { getPostpostidwithUserName } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';
import CeradepCommnt from './ceadteCommentFrom';

export default async function ItemProfilePage(props) {
  const itemId = Number(props.params.postid);
  const posts = await getPostpostidwithUserName(itemId);
  const allcomments = await getAllComments();
  const tokenCooke = cookies().get('sessionToken');
  const user = await getUserBySessionToken(tokenCooke.value);
  const userid = Number(user?.id);

  const comments = allcomments.filter((comment) => comment.postId === itemId);
  await createComment(userid, itemId, 'Test', 0);
  console.log(comments);

  return (
    <>
      <h3> Post</h3>
      <ul>
        {posts.map(async (post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.post}</p>
            <p>{post.image}</p>
            <Link href={'/'}>
              <p>{post.username}</p>
            </Link>
            <p>{post.score} </p>
          </li>
        ))}
      </ul>
      <h3> Comments</h3>

      <ul>
        {comments.map(async (comment) => (
          <li key={comment.id}>
            <h3>{comment.post}</h3>
            <p>{comment.score} </p>
          </li>
        ))}
      </ul>
    </>
  );
}
