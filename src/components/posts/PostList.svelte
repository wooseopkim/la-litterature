<script lang="ts">
  import { SkeletonText } from 'carbon-components-svelte';
  import { db } from '../../firebase-shortcut';
  import PostEditor from './PostEditor.svelte';
  import PostItem from './PostItem.svelte';

  const placeholderCount = 4;
  const placeholderSize = 8;

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
  <PostEditor />
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
    padding-bottom: 32rem;
    width: 60em;
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
