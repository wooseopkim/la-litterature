<script lang="ts">
  import { Button, InlineNotification, Loading, TextInput } from 'carbon-components-svelte';
  import EditorJS from '@editorjs/editorjs';
  import tools from './editorjs-tools';
  import SlottedPostEditor from './SlottedPostEditor.svelte';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';

  let editor: EditorJS;
  let editorContainer: HTMLElement;
  let title: string;

  $: if (editorContainer) {
    editor = new EditorJS({
      holder: editorContainer,
      tools,
      minHeight: 0,
    });
  }

  function createOnTitleChange(maxLength: number): (e: Event) => void {
    return (e) => {
      const input = e.target as HTMLInputElement;
      input.value = input.value.trim().substring(0, maxLength);
    };
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
  <div slot="title" let:maxLength>
    <TextInput
      light
      hideLabel
      on:input={createOnTitleChange(maxLength)}
      bind:value={title}
    />
  </div>
  <div slot="content" class="content">
    <div bind:this={editorContainer} />
  </div>
  <div slot="button" let:text let:submit>
    <Button kind="secondary" on:click={createOnSubmit(submit)}>
      {text}
    </Button>
  </div>
  <div slot="loader">
    <Button kind="secondary">
      <Loading small withOverlay={false} />
    </Button>
  </div>
  <div slot="error" class="error" let:error>
    <InlineNotification
      hideCloseButton
      title={error}
    />
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

  .error :global(.bx--inline-notification) {
    margin: 0;
    max-width: none;
  }

  .error :global(.bx--inline-notification__details) {
    width: 100%;
  }

  .error :global(.bx--inline-notification) {
    margin: 0;
    max-width: none;
  }

  .error :global(.bx--inline-notification__details) {
    width: 100%;
  }
</style>
