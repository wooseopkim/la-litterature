import type firebase from 'firebase/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mocked = jest.createMockFromModule('./firebase-shortcut') as any;

let onAuthStateChanged: (x: Partial<firebase.User>) => void;
mocked.auth = {
  onAuthStateChanged: (f: (x: firebase.User) => void) => {
    onAuthStateChanged = f;
  },
};
mocked.__setAuthState = (x: Partial<firebase.User>) => {
  onAuthStateChanged && onAuthStateChanged(x);
};

let resolveCollection: (x: unknown[]) => void;
mocked.db = {
  collection: () => {
    return {
      get: () => {
        return new Promise((resolve) => resolveCollection = resolve);
      },
    };
  },
};
mocked.__loadData = (x: unknown[]) => {
  resolveCollection(x.map((y) => ({ data: () => y })));
};

module.exports = mocked;
