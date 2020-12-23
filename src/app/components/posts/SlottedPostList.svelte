<script lang="ts">
  import { db } from '../../../adapters/network/firebase-shortcut';
  import readPosts from '../../../usecases/posts/readPosts';

  const placeholderCount = 4;
  const placeholderSize = 8;

  export let editable = false;
  const fetchPosts = readPosts(db);
</script>

<section>
  {#if editable}
    <slot name="editor">편집기</slot>
  {/if}
  {#await fetchPosts}
    {#each new Array(placeholderCount) as _}
      <slot name="placeholder" size={placeholderSize}>
        로딩
      </slot>
    {/each}
  {:then posts}
    {#each posts as post}
      <slot name="item" item={post}>
        게시물: {post.title}
      </slot>
    {/each}
  {/await}
</section>

<style>
  section {
    padding-top: 1rem;
    padding-bottom: 50vh;
    width: 60em;
  }

  @media screen and (max-width: 60em) {
    section {
      width: 100%;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media screen and (max-width: 40em) {
    section {
      padding-left: 0rem;
      padding-right: 0rem;
    }
  }

  section > :global(*) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  section > :global(.skeleton) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
</style>
