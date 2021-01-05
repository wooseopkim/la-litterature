<script lang="ts">
  export let caption: string;
</script>

<div class="captioned">
  <slot />
  {#if caption}
    <div class="caption">{caption}</div>
  {/if}
</div>

<style>
  .caption {
    margin-top: 0.4rem;
    opacity: 0.5;
  }

  .captioned :global(.caption::before) {
    content: '🡪';
    margin-right: 0.4rem;
  }
</style>
