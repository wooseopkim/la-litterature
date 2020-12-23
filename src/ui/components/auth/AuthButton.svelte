<script lang="ts">
  import firebase from 'firebase';
  import { Button } from 'carbon-components-svelte';
  import { auth } from '../../../adapters/network/firebase-shortcut';

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

<Button on:click={onClick}>{provider.name}</Button>
