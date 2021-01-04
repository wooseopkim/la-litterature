import type firebase from 'firebase/app';
import type Post from '../../adapters/network/posts/Post';

export default async function readPosts(
  db: firebase.firestore.CollectionReference<Post>,
): Promise<Post[]> {
  // TODO: add pagination logic
  const result = await db.orderBy('created', 'desc').get();
  const posts: Post[] = [];
  result.forEach((x) => {
    const post = x.data() as Post;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}
