<script lang="ts">
  import { db } from '../../firebase-shortcut';
  import PostItem from './PostItem.svelte';

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

{#if posts}
  {#each posts as post}
    <PostItem data={post} />
  {/each}
{:else}
  <div>로딩...</div>
{/if}
