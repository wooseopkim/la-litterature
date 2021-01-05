<script lang="ts">
  import SlottedToolbar from './SlottedToolbar.svelte';
</script>

<SlottedToolbar>
  <div slot="loading">로딩</div>
  <div slot="not-logged-in">로그인</div>
  <div slot="logged-in" let:userName>{userName}</div>
</SlottedToolbar>
