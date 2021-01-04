<script lang="ts">
  import type PostData from '../../../../adapters/network/posts/Post';
  import Fragment from './Fragment.svelte';
  
  export let data: PostData;
</script>

<article>
  <h1>{data.title}</h1>
  <main>
    {#each data.content as fragment}
      <Fragment data={fragment} />
    {/each}
  </main>
</article>

<style>
  article {
    border: 1px solid lightgrey;
    background-color: white;
  }

  h1,
  main {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  h1 {
    border-bottom: 1px solid;
    padding-top: 2rem;
    padding-bottom: 1.2rem;
  }

  main {
    padding-top: 1.4rem;
    padding-bottom: 2rem;
  }
</style>
