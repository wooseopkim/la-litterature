<script lang="ts">
  import Toolbar from './components/toolbar/Toolbar.svelte';
  import PostList from './components/posts/PostList.svelte';
  import 'carbon-components-svelte/css/white.css';
</script>

<main>
  <Toolbar />
  <PostList />
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
