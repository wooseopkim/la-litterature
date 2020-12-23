import type firebase from 'firebase/app';
import type PostData from '../../adapters/network/PostData';

export default async function readPosts(
  db: firebase.firestore.Firestore,
): Promise<PostData[]> {
  // TODO: add pagination logic
  const result = await db.collection('posts').get();
  const posts: PostData[] = [];
  result.forEach((x) => {
    const post = x.data() as PostData;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}
