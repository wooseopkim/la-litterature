<script lang="ts">
  import type PostData from '../../../../adapters/network/posts/Post';
  import Fragment from './Fragment.svelte';
  
  export let data: PostData;
</script>

<article>
  <h1>{data.title}</h1>
  {#each data.content as fragment}
    <Fragment data={fragment} />
  {/each}
</article>

<style>
  article {
    padding: 2rem;
    border: 1px solid lightgrey;
    background-color: white;
  }

  h1 {
    margin-bottom: 1rem;
  }
</style>
