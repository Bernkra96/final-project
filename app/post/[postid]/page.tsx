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

  return (
    <>
      <h3> Post</h3>
      <ul>
        {posts.map(async (post) => (
          <li key={`post-${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.post}</p>
            <p> {post.id}</p>
            {post.image ? (
              <Image
                src={post.image}
                width={500}
                height={500}
                unoptimized={true}
                alt="Picture of the author"
              />
            ) : null}

            <Link href={`/profile/${post.username}`}>
              <p>{post.username}</p>
            </Link>
            <p>{post.score} </p>
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
      <CreateComment postid={itemId} />
      <h3> Comments</h3>
      <ul>
        {comments.map(async (comment) => (
          <li key={`commentid-${comment.id}`}>
            <p>{comment.id}</p>
            <p>Uder Id {comment.userId}</p>

            <p>{comment.post}</p>
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
              />
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
