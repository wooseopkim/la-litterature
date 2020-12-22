<script lang="ts">
  import 'carbon-components-svelte/css/white.css';
  import { Button } from 'carbon-components-svelte';
  import firebase from 'firebase/app';
  import AuthButton from './components/auth/AuthButton.svelte';
  import Toolbar from './components/toolbar/Toolbar.svelte';
  import PostList from './components/posts/PostList.svelte';  

  const googleProvider = {
    instance: new firebase.auth.GoogleAuthProvider(),
    // TODO: i18n
    name: '구글'
  };
</script>

<main>
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
  <PostList editable={true} />
</main>

<style>
  :global(body) {
    display: flex;
    justify-content: center;
    background-image: url('/background.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  :global(html),
  :global(body),
  main {
    height: initial;
  }
</style>
