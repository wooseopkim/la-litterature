<script lang="ts">
  import { auth } from '../../../adapters/network/firebase-shortcut';

  let loggedIn: 'loading' | 'yes' | 'no' = 'loading';
  let userName: string;
  auth.onAuthStateChanged((x) => {
    loggedIn = Boolean(x) ? 'yes' : 'no';
    if (x) {
      userName = x.displayName;
    };
  });
</script>

<section>
  <div class="content">
    <h1>라 리테라튀르</h1>

    {#if loggedIn === 'loading'}
      <slot name="loading">
        <div>로딩</div>
      </slot>
    {:else if loggedIn === 'no'}
      <slot name="not-logged-in">
        <div>로그인하기</div>
      </slot>
    {:else if loggedIn === 'yes'}
      <slot name="logged-in" userName={userName}>
        <div>사용자: {userName}</div>
      </slot>
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
