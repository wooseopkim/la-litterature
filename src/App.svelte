<script lang="ts">
  import AuthPanel from './components/auth/AuthPanel.svelte';
  import { db } from './firebase';

  let posts = [];

  // TODO: add pagination logic
  const query = db.collection('posts').get();
  (async () => {
    (await query).forEach((x) => {
      const post = x.data();
      posts = [...posts, { ...post, id: x.id }];
    });
  })();
</script>

<main>
  <AuthPanel />

  {#each posts as post}
    <pre>{JSON.stringify(post)}</pre>
  {/each}
</main>
