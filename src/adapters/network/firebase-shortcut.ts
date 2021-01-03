import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import type Post from './posts/Post';
import type User from './users/User';

firebase.initializeApp({
  apiKey: 'AIzaSyBJX24_x0Lia44kHo6wpPFUXwLosXXJy9s',
  authDomain: 'la-litterature.firebaseapp.com',
  projectId: 'la-litterature',
  storageBucket: 'la-litterature.appspot.com',
  messagingSenderId: '606442312543',
  appId: '1:606442312543:web:687663ad0c24af53b01cea',
  measurementId: 'G-M8H7DEBMC7',
});

export const auth = firebase.auth();

const db = firebase.firestore();
export const collections = {
  users: db.collection('users').withConverter(createConverter<User>()),
  posts: db.collection('posts').withConverter(createConverter<Post>()),
};

function createConverter<T>(): firebase.firestore.FirestoreDataConverter<T> {
  return {
    toFirestore(model: T): firebase.firestore.DocumentData {
      return { ...model };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    ): T {
      return { ...snapshot.data() } as T;
    },
  };
}
