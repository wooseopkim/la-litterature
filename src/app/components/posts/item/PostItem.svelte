<script lang="ts">
  import type PostData from "../../../../adapters/network/PostData";
  
  export let data: PostData;
</script>

<article>
  <h1>{data.title}</h1>
  <p>{data.content}</p>
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
