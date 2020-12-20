<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import firebase from 'firebase/app';
  import { auth } from '../../firebase-shortcut';
  import AuthButton from '../auth/AuthButton.svelte';

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

<section>
  <div>
    <h1>라 리테라튀르</h1>

    {#if loggedIn === 'yes'}
      <Button as let:props kind="secondary">
        <span {...props}>{userName}</span>
      </Button>
    {:else if loggedIn === 'no'}
      <AuthButton provider={googleProvider} />
    {:else}<!-- loggedIn === 'loading' -->
      <!-- TODO: show as a circular progress -->
      <Button skeleton />
    {/if}
  </div>
</section>

<style>
  section {
    width: 100%;
    padding-top: 8rem;
    padding-bottom: 4rem;
    padding-left: 0rem;
    padding-right: 0rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    width: 60em;
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-family: 'Noto Serif KR';
    color: white;
    filter: drop-shadow(0 0 0.3rem white);
  }
</style>
