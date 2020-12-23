import type firebase from 'firebase/app';
import type PostResponse from '../../adapters/network/PostResponse';

export default async function readPosts(
  db: firebase.firestore.Firestore
) {
  // TODO: add pagination logic
  const result = await db.collection('posts').get();
  let posts: PostResponse[] = [];
  result.forEach((x) => {
    const post = x.data() as PostResponse;
    posts.push({ ...post, id: x.id });
  });
  return posts;
}
