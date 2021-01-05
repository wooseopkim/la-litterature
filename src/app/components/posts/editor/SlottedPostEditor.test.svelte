<script lang="ts">
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';
  import SlottedPostEditor from './SlottedPostEditor.svelte';

  let title: string;
  let content: string;

  function createOnSubmit(
    submit: (title: string, content: Fragment[], clear: () => void) => void,
  ): (e: Event) => void {
    return async () => {
      submit(title, [{ type: 'text', data: { text: content } }], clear);
    };
  }

  function clear() {
    title = '';
    content = '';
  }
</script>

<SlottedPostEditor>
  <div slot="title"><input bind:value={title} /></div>
  <div slot="content"><textarea bind:value={content} /></div>
  <div slot="button" let:submit let:text>
    <button on:click={createOnSubmit(submit)}>
      {text}
    </button>
  </div>
  <div slot="loader">로딩</div>
</SlottedPostEditor>
