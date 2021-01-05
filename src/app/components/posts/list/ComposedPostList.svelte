<script lang="ts">
  import { SkeletonText } from 'carbon-components-svelte';
  import ComposedPostEditor from '../editor/ComposedPostEditor.svelte';
  import Post from '../item/Post.svelte';
  import SlottedPostList from './SlottedPostList.svelte';

  export let editable = false;
</script>

<SlottedPostList editable={editable}>
  <div slot="editor">
    <ComposedPostEditor />
  </div>
  <div slot="item" let:item>
    <Post data={item} />
  </div>
  <div slot="placeholder" let:size>
    <SkeletonText paragraph lines={size} />
  </div>
</SlottedPostList>
