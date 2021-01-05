<script lang="ts">
  import { auth, collections } from '../../../adapters/network/firebase-shortcut';
  import getAuthState from '../../../usecases/auth/getAuthState';

  const getAuthStateResult = getAuthState(auth, collections.users);
</script>

<section>
  <div class="content">
    <h1>라 리테라튀르</h1>

    {#await getAuthStateResult}
      <slot name="loading" />
    {:then user}
      <slot name="logged-in" userName={user.name} />
    {:catch}
      <slot name="not-logged-in" />
    {/await}
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

  h1 {
    user-select: none;
  }

  .content {
    width: 60em;
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 60em) {
    div {
      width: 100%;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media screen and (max-width: 40em) {
    div {
      flex-direction: column;
      align-items: flex-end;
    }
  }

  h1 {
    font-family: 'Noto Serif KR';
    color: white;
    filter: drop-shadow(0 0 0.3rem white);
  }

  @media screen and (max-width: 40em) {
    h1 {
      margin-bottom: 1rem;
    }
  }
</style>
