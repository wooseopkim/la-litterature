<script lang="ts">
  import firebase from 'firebase';
  import { auth } from '../../firebase-shortcut';

  export let provider: {
    name: string,
    instance: firebase.auth.AuthProvider
  };

  async function onClick() {
    // TODO: provide as an option if app should remember the user
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    auth.signInWithRedirect(provider.instance);
  }
</script>

<h3>{provider.name}</h3>
<button on:click={onClick}>인증</button>
