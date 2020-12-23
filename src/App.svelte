<script lang="ts">
  import 'carbon-components-svelte/css/all.css';
  import router from 'page';
  import Feed from './ui/pages/Feed.svelte';
  import NotFound from './ui/pages/NotFound.svelte';

  let page;
  router('/', '/feed');
  router('/feed', () => page = Feed);
  router(() => page = NotFound);
  router.start();
</script>

<div class="layout">
  <svelte:component this={page} />
</div>

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

  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
  }

  :root {
    --cds-interactive-01: #0f62fe !important;
    --cds-interactive-02: #393939 !important;
    --cds-interactive-03: #0f62fe !important;
    --cds-interactive-04: #0f62fe !important;
    --cds-focus: #0f62fe !important;
    --cds-hover-primary: #0353e9 !important;
    --cds-active-primary: #002d9c !important;
    --cds-hover-primary-text: #0043ce !important;
    --cds-hover-tertiary: #0353e9 !important;
    --cds-active-tertiary: #002d9c !important;
    --cds-brand-01: #0f62fe !important;
    --cds-brand-02: #393939 !important;
    --cds-brand-03: #0f62fe !important;
  }
</style>
