<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import firebase from 'firebase/app';
  import AuthButton from '../auth/AuthButton.svelte';
  import Toolbar from './SlottedToolbar.svelte';

  const googleProvider = {
    instance: new firebase.auth.GoogleAuthProvider(),
    // TODO: i18n
    name: '구글'
  };
</script>

<Toolbar let:userName={userName}>
  <div slot="loading">
    <Button skeleton />
  </div>
  <div slot="not-logged-in">
    <AuthButton provider={googleProvider} />
  </div>
  <div slot="logged-in">
    <Button>{userName}</Button>
  </div>
</Toolbar>
