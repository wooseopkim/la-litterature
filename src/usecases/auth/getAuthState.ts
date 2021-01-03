import type firebase from 'firebase/app';
import type User from '../../adapters/network/users/User';

export default async function getAuthState(
  auth: firebase.auth.Auth,
  collection: firebase.firestore.CollectionReference<User>,
): Promise<User> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((auth) => {
      if (!auth) {
        reject();
        return;
      }

      collection
        .where('uid', '==', auth.uid)
        .where('providerId', '==', auth.providerId)
        .limit(1)
        .get()
        .then((record) => onRead(record, auth))
        .catch((e) => reject(e));
    });

    function onRead(record: firebase.firestore.QuerySnapshot<User>, auth: firebase.User) {
      if (!record.empty) {
        resolve(record.docs[0].data() as User);
        return;
      }

      const user: User = {
        providerId: auth.providerId,
        uid: auth.uid,
        name: auth.displayName,
        profileUrl: auth.photoURL,
      };
      collection.add(user)
        .then(() => resolve(user))
        .catch((e) => reject(e));
    }
  });
}
