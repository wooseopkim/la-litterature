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
    background-image: url('https://pixabay.com/get/53e8d643435aaa14f6d1867dda2c34791439dfec4e5077497d2b73d59e4ac2_1920.jpg');
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
