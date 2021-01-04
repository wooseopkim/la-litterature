<script lang="ts">
  import { SkeletonText } from 'carbon-components-svelte';
  import PostEditor from './editor/PostEditor.svelte';
  import Post from './item/Post.svelte';
  import SlottedPostList from './SlottedPostList.svelte';

  export let editable = false;
</script>

<SlottedPostList editable={editable} let:item={item} let:placeholderSize={placeholderSize}>
  <div slot="editor">
    <PostEditor />
  </div>
  <div slot="item">
    <Post data={item} />
  </div>
  <div slot="placeholder">
    <SkeletonText paragraph lines={placeholderSize} />
  </div>
</SlottedPostList>
