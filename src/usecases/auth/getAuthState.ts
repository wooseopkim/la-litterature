import type firebase from 'firebase/app';
import type UserData from '../../adapters/network/UserData';

export default async function getAuthState(
  auth: firebase.auth.Auth,
  collection: firebase.firestore.CollectionReference<UserData>,
): Promise<UserData> {
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

    function onRead(record: firebase.firestore.QuerySnapshot<UserData>, auth: firebase.User) {
      if (!record.empty) {
        resolve(record.docs[0].data() as UserData);
        return;
      }

      const user: UserData = {
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
