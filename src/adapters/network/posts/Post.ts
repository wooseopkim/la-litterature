import type firebase from 'firebase/app';
import type User from '../users/User';
import type Fragment from './fragments/Fragment';

export default interface Post {
  author: firebase.firestore.DocumentReference<User>;
  id: string;
  title: string;
  content: Fragment[];
  created: firebase.firestore.Timestamp;
}
