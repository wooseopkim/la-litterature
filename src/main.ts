import App from './App.svelte';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyBJX24_x0Lia44kHo6wpPFUXwLosXXJy9s',
  authDomain: 'la-litterature.firebaseapp.com',
  projectId: 'la-litterature',
  storageBucket: 'la-litterature.appspot.com',
  messagingSenderId: '606442312543',
  appId: '1:606442312543:web:687663ad0c24af53b01cea',
  measurementId: 'G-M8H7DEBMC7'
});

const app = new App({
	target: document.body
});

export default app;