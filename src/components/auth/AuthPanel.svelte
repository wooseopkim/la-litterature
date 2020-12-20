<script lang="ts">
  import firebase from 'firebase/app';
  import { auth } from '../../firebase-shortcut';
  import AuthButton from './AuthButton.svelte';

  let loggedIn: 'loading' | 'yes' | 'no' = 'loading';
  let userName: string;
  auth.onAuthStateChanged((x) => {
    loggedIn = Boolean(x) ? 'yes' : 'no';
    if (x) {
      userName = x.displayName;
    };
  })

  const googleProvider = {
    instance: new firebase.auth.GoogleAuthProvider(),
    // TODO: i18n
    name: '구글'
  };
</script>

{#if loggedIn === 'yes'}
  <div>{userName}</div>
{:else if loggedIn === 'no'}
  <AuthButton provider={googleProvider} />
{:else}<!-- loggedIn === 'loading' -->
  <!-- TODO: show as a circular progress -->
  <div>로딩...</div>
{/if}
