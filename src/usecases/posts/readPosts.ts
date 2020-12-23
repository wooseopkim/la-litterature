import type firebase from 'firebase/app';
import type PostData from '../.../../adapters/network/PostData';

export default async function readPosts(
  db: firebase.firestore.Firestore
) {
  // TODO: add pagination logic
  const result = await db.collection('posts').get();
  let posts: PostData[] = [];
  result.forEach((x) => {
    const post = x.data() as PostData;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}