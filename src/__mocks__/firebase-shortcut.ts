import type firebase from 'firebase/app';

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

module.exports = mocked;
