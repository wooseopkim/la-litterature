import firebase from 'firebase/app';
import type Post from '../../adapters/network/posts/Post';

type Draft = Pick<Post, 'title' | 'content'>;

export default async function createPost(
  db: firebase.firestore.CollectionReference<Post>,
  draft: Draft,
): Promise<void> {
  const post = {
    ...draft,
    id: '',
    created: firebase.firestore.Timestamp.now(),
  };
  await db.add(post);
}
