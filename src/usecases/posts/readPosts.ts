import type firebase from 'firebase/app';
import type PostData from '../../adapters/network/PostData';

export default async function readPosts(
  db: firebase.firestore.CollectionReference<PostData>,
): Promise<PostData[]> {
  // TODO: add pagination logic
  const result = await db.orderBy('created').get();
  const posts: PostData[] = [];
  result.forEach((x) => {
    const post = x.data() as PostData;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}
