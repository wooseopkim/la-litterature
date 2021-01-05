<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import firebase from 'firebase/app';
  import AuthButton from '../auth/AuthButton.svelte';
  import SlottedToolbar from './SlottedToolbar.svelte';

  const googleProvider = {
    instance: new firebase.auth.GoogleAuthProvider(),
    // TODO: i18n
    name: '구글',
  };
</script>

<SlottedToolbar>
  <div slot="loading">
    <Button skeleton />
  </div>
  <div slot="not-logged-in">
    <AuthButton provider={googleProvider} />
  </div>
  <div slot="logged-in" let:userName>
    <Button>{userName}</Button>
  </div>
</SlottedToolbar>
