<script lang="ts">
  import SlottedPostList from './SlottedPostList.svelte';

  export let editable: boolean;
</script>

<SlottedPostList editable={editable}>
  <div slot="editor">편집기</div>
  <div slot="item" let:item>{item.title}</div>
  <div slot="placeholder" let:size>
    {#each Array(size) as _}...{/each}
  </div>
</SlottedPostList>
