import firebase from 'firebase/app';
import type Fragment from '../../adapters/network/posts/fragments/Fragment';
import { isTextFragment } from '../../adapters/network/posts/fragments/TextFragment';
import type Post from '../../adapters/network/posts/Post';
import type User from '../../adapters/network/users/User';

type Draft = Pick<Post, 'title' | 'content'>;

export const notAuthenticatedError = new Error();
export const titleEmptyError = new Error();
export const contentEmptyError = new Error();
export const titleTooLongError = new Error();
export const titleMaxLength = 32;

export default async function createPost(
  postDb: firebase.firestore.CollectionReference<Post>,
  author: User,
  draft: Draft,
): Promise<void> {
  if (!author?.uid) {
    throw notAuthenticatedError;
  }
  if (!draft.title.trim().length) {
    throw titleEmptyError;
  }
  if (draft.content.every(isEmptyFragment)) {
    throw contentEmptyError;
  }
  if (draft.title.length > titleMaxLength) {
    throw titleTooLongError;
  }
  const post: Post = {
    ...draft,
    created: firebase.firestore.Timestamp.now(),
    authorUid: author.uid,
  };
  await postDb.add(post);
}

function isEmptyFragment(x: Fragment): boolean {
  return isTextFragment(x) && x.data.text.replace(/&nbsp;/g, '').trim() === '';
}
