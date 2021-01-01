<script lang="ts">
  import firebase from 'firebase/app';
  import { Button } from 'carbon-components-svelte';
  import logIn from '../../../usecases/auth/logIn';
  import { auth } from '../../../adapters/network/firebase-shortcut';
  
  export let provider: {
    name: string,
    instance: firebase.auth.AuthProvider
  };

  async function onClick() {
    await logIn({
      auth,
      provider: provider.instance,
      persistence: firebase.auth.Auth.Persistence.LOCAL,
    });
  }
</script>

<Button on:click={onClick}>{provider.name}</Button>
