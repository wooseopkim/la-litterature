<script lang="ts">
  import AuthPanel from './components/auth/AuthPanel.svelte';
  import PostList from './components/posts/PostList.svelte';
</script>

<main>
  <AuthPanel />
  <PostList />
</main>

<style>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
