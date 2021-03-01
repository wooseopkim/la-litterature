import type firebase from 'firebase/app';
import type Post from '../../adapters/network/posts/Post';

const limit = 10;

export default async function readPosts(
  db: firebase.firestore.CollectionReference<Post>,
  last: firebase.firestore.Timestamp,
): Promise<Post[]> {
  const result = await db.orderBy('created', 'desc')
    .startAfter(last)
    .limit(limit)
    .get();
  const posts: Post[] = [];
  result.forEach((x) => {
    const post = x.data() as Post;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}
