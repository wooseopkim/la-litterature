import type firebase from 'firebase/app';
import type User from '../../adapters/network/users/User';
import getAuthState from './getAuthState';

/* eslint-disable @typescript-eslint/no-unused-vars */
let firebaseUser: firebase.User;
const auth = {
  async setPersistence(persistence: string) { /* no op */ },
  async signInWithRedirect(provider: firebase.auth.AuthProvider) { /* no op */ },
  onAuthStateChanged(observer: (user: firebase.User) => void) {
    observer(firebaseUser);
  },
} as firebase.auth.Auth;

let addResult: Promise<firebase.firestore.DocumentReference>;
let readResult: Promise<firebase.firestore.QuerySnapshot<User>>;
const collection = {
  add(doc: User): Promise<firebase.firestore.DocumentReference> {
    return addResult;
  },
  where(
    fieldPath: string | firebase.firestore.FieldPath,
    op: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
  ): firebase.firestore.Query<User> {
    return collection;
  },
  limit(limit: number): firebase.firestore.Query<User> {
    return collection;
  },
  get(): Promise<firebase.firestore.QuerySnapshot<User>> {
    return readResult;
  },
} as firebase.firestore.CollectionReference<User>;
/* eslint-enable @typescript-eslint/no-unused-vars */

describe('getAuthState', () => {
  beforeEach(() => {
    firebaseUser = null;
    addResult = null;
    readResult = null;
  });

  it('should reject when auth data is null', async () => {
    firebaseUser = null;

    const result = getAuthState(auth, collection);

    return expect(result).rejects.not.toEqual([]);
  });

  it('should reject when fetching existing user failed', async () => {
    firebaseUser = {
      uid: '123',
      displayName: '우섭',
      photoURL: '',
      providerId: 'test',
    } as firebase.User;
    readResult = Promise.reject();

    const result = getAuthState(auth, collection);

    return expect(result).rejects.not.toEqual([]);
  });

  it('should resolve but not create a new user when existing', async () => {
    firebaseUser = {
      uid: '123',
      displayName: '우섭',
      photoURL: '',
      providerId: 'test',
    } as firebase.User;
    const appUser: User = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      profileUrl: firebaseUser.photoURL,
      providerId: firebaseUser.providerId,
    };
    readResult = Promise.resolve(
      { empty: false, docs: [{ data: () => appUser }] } as firebase.firestore.QuerySnapshot<User>
    );

    const result = getAuthState(auth, collection);

    return expect(result).resolves.toEqual(appUser);
  });

  it('should reject when user document creation failed', async () => {
    firebaseUser = {
      uid: '123',
      displayName: '우섭',
      photoURL: '',
      providerId: 'test',
    } as firebase.User;
    readResult = Promise.resolve({ empty: true } as firebase.firestore.QuerySnapshot<User>);
    addResult = Promise.reject();

    const result = getAuthState(auth, collection);

    return expect(result).rejects.not.toEqual([]);
  });

  it('should resolve when user document creation passed', async () => {
    firebaseUser = {
      uid: '123',
      displayName: '우섭',
      photoURL: '',
      providerId: 'test',
    } as firebase.User;
    readResult = Promise.resolve({ empty: true } as firebase.firestore.QuerySnapshot<User>);
    addResult = Promise.resolve({} as firebase.firestore.DocumentReference);

    const result = getAuthState(auth, collection);

    const appUser: User = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      profileUrl: firebaseUser.photoURL,
      providerId: firebaseUser.providerId,
    };
    return expect(result).resolves.toEqual(appUser);
  });
});
