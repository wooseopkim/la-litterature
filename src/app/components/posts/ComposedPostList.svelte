<script lang="ts">
  import { SkeletonText } from 'carbon-components-svelte';
  import PostEditor from './editor/PostEditor.svelte';
  import PostItem from './item/PostItem.svelte';
  import SlottedPostList from './SlottedPostList.svelte';

  export let editable = false;
</script>

<SlottedPostList editable={editable} let:item={item} let:placeholderSize={placeholderSize}>
  <div slot="editor">
    <PostEditor />
  </div>
  <div slot="item">
    <PostItem data={item} />
  </div>
  <div slot="placeholder">
    <SkeletonText paragraph lines={placeholderSize} />
  </div>
</SlottedPostList>
