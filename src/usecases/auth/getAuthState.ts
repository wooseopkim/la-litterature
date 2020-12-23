import type firebase from 'firebase/app';

export default async function getAuthState(
  auth: firebase.auth.Auth
): Promise<firebase.User> {
  return new Promise<firebase.User>((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        reject();
        return;
      }
      resolve(user);
    })
  });
}