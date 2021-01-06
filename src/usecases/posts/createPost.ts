import firebase from 'firebase/app';
import type Post from '../../adapters/network/posts/Post';
import type User from '../../adapters/network/users/User';

type Draft = Pick<Post, 'title' | 'content'>;

export default async function createPost(
  postDb: firebase.firestore.CollectionReference<Post>,
  userDb: firebase.firestore.CollectionReference<User>,
  user: User,
  draft: Draft,
): Promise<void> {
  const authorUser = await userDb
    .where('uid', '==', user.uid)
    .where('providerId', '==', user.providerId)
    .limit(1)
    .get();
  const post = {
    ...draft,
    id: '',
    created: firebase.firestore.Timestamp.now(),
    author: authorUser.docs[0].ref,
  };
  await postDb.add(post);
}
