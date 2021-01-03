import type firebase from 'firebase/app';
import type Fragment from './fragments/Fragment';

export default interface Post {
  id: string;
  title: string;
  content: Fragment[];
  created: firebase.firestore.Timestamp;
}
