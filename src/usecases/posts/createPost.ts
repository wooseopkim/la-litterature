import firebase from 'firebase/app';
import type Post from '../../adapters/network/posts/Post';
import type User from '../../adapters/network/users/User';

type Draft = Pick<Post, 'title' | 'content'>;

export default async function createPost(
  postDb: firebase.firestore.CollectionReference<Post>,
  author: User,
  draft: Draft,
): Promise<void> {
  const post = {
    ...draft,
    id: '',
    created: firebase.firestore.Timestamp.now(),
    authorUid: author.uid,
  };
  await postDb.add(post);
}
