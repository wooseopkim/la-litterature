import firebase from 'firebase/app';

// TODO: provide as an option if app should remember the user
export default async function logIn(
  auth: firebase.auth.Auth,
  provider: firebase.auth.AuthProvider
) {
  return Promise.all([
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL),
    auth.signInWithRedirect(provider)
  ]);
}
