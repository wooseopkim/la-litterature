<script lang="ts">
  import { auth } from '../../firebase';

  export let provider: {
    name: string,
    instance: firebase.auth.AuthProvider
  };

  async function onClick() {
    auth.signInWithRedirect(provider.instance);
  }
</script>

<h3>{provider.name}</h3>
<button on:click={onClick}>인증</button>
