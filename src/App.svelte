<script lang="ts">
  import 'carbon-components-svelte/css/white.css';
  import PostList from './components/posts/PostList.svelte';  
  import AppToolbar from './components/toolbar/AppToolbar.svelte';
</script>

<main>
  <AppToolbar />
  <PostList editable={true} />
</main>

<style>
  :global(body) {
    display: flex;
    justify-content: center;
    background-image: url('/background.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  :global(html),
  :global(body),
  main {
    height: initial;
  }
</style>
