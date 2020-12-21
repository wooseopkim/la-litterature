<script lang="ts">
  import { Button } from 'carbon-components-svelte';
  import EditorJS from '@editorjs/editorjs';
  import tools from './editorjs-tools';
  
  let editor: EditorJS;
  let target: HTMLElement;

  $: if (target) {
    editor = new EditorJS({
      holder: target,
      tools,
      sanitizer: {
        p: function() {
          console.log(arguments);
          return true;
        }
      },
      minHeight: 0
    });
  }

  async function onSubmit() {
    const data = await editor.save();
    console.log(data);
  }
</script>

<div class="layout">
  <div class="editor" bind:this={target} />
  <Button kind="secondary" on:click={onSubmit}>투고</Button>
</div>

<style>
  .layout {
    background-color: white;
  }

  .editor :global(.codex-editor__redactor) {
    padding-top: 1rem;
    padding-bottom: 1rem !important;
  }

  .editor :global(.ce-inline-toolbar) {
    border-radius: 0px;
  }

  .layout > :global(button) {
    width: 100%;
    max-width: initial;
    display: flex;
    justify-content: flex-end;
  }
</style>
