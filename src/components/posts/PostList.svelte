<script lang="ts">
  import { SkeletonText } from 'carbon-components-svelte';
  import { db } from '../../firebase-shortcut';
  import PostEditor from './editor/PostEditor.svelte';
  import PostItem from './item/PostItem.svelte';

  const placeholderCount = 4;
  const placeholderSize = 8;

  export let editable: boolean = false;
  let posts;

  // TODO: add pagination logic
  const query = db.collection('posts').get();
  (async () => {
    (await query).forEach((x) => {
      const post = x.data();
      posts = [...(posts || []), { ...post, id: x.id }];
    });
  })();
</script>

<div>
  {#if editable}<PostEditor />{/if}
  {#if posts}
    {#each posts as post}
      <PostItem data={post} />
    {/each}
  {:else}
    {#each new Array(placeholderCount) as _}
      <SkeletonText class="skeleton" paragraph lines={placeholderSize} />
    {/each}
  {/if}
</div>

<style>
  div {
    padding-top: 1rem;
    padding-bottom: 50vh;
    width: 60em;
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
      padding-left: 0rem;
      padding-right: 0rem;
    }
  }

  div > :global(*) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  div > :global(.skeleton) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
</style>
