<script lang="ts">
  import { Button, Loading, TextInput } from 'carbon-components-svelte';
  import EditorJS from '@editorjs/editorjs';
  import tools from './editorjs-tools';
  import SlottedPostEditor from './SlottedPostEditor.svelte';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';

  let editor: EditorJS;
  let target: HTMLElement;
  let title: string;

  $: if (target) {
    editor = new EditorJS({
      holder: target,
      tools,
      minHeight: 0,
    });
  }

  function createOnSubmit(
    submit: (title: string, content: Fragment[], clear: () => void) => void,
  ): (e: Event) => void {
    return async () => {
      const content = (await editor.save()).blocks as Fragment[];
      submit(title, content, clear);
    };
  }

  function clear() {
    title = '';
    editor.clear();
  }
</script>

<SlottedPostEditor>
  <div slot="title">
    <TextInput light hideLabel bind:value={title} />
  </div>
  <div slot="content" class="content">
    <div bind:this={target} />
  </div>
  <div slot="button" let:text let:submit>
    <Button kind="secondary" on:click={createOnSubmit(submit)}>{text}</Button>
  </div>
  <div slot="loader">
    <Button kind="secondary">
      <Loading small withOverlay={false} />
    </Button>
  </div>
</SlottedPostEditor>

<style>
  .content :global(.codex-editor__redactor) {
    padding-top: 1rem;
    padding-bottom: 2rem !important;
  }

  .content :global(.ce-inline-toolbar) {
    border-radius: 0px;
  }

  .content :global(.ce-header) {
    padding-top: 0;
  }
</style>
