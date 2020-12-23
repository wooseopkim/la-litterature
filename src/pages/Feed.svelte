<script lang="ts">
  import ComposedPostList from '../components/posts/ComposedPostList.svelte';
  import ComposedToolbar from '../components/toolbar/ComposedToolbar.svelte';
</script>

<div class="page">
  <header>
    <ComposedToolbar />
  </header>
  <main>
    <ComposedPostList editable={true} />
  </main>
</div>

<style>
  .page {
    height: initial;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  main {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
