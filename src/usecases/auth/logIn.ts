import type firebase from 'firebase/app';

export default async function logIn({
  auth,
  provider,
  persistence,
}: {
  auth: firebase.auth.Auth;
  provider: firebase.auth.AuthProvider;
  persistence: string;
}): Promise<void> {
  return Promise.all([
    auth.setPersistence(persistence),
    auth.signInWithRedirect(provider),
  ]).then();
}
