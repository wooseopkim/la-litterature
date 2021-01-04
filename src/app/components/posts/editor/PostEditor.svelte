<script lang="ts">
  import { Button, TextInput } from 'carbon-components-svelte';
  import EditorJS from '@editorjs/editorjs';
  import tools from './editorjs-tools';
  import createPost from '../../../../usecases/posts/createPost';
  import { collections } from '../../../../adapters/network/firebase-shortcut';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';

  const titleMaxLength = 64;
  
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
  $: if (title?.length > titleMaxLength) {
    title = title.substring(0, titleMaxLength);
  }

  async function onSubmit() {
    const data = await editor.save();
    const draft = {
      title,
      content: data.blocks as Fragment[],
    };
    createPost(collections.posts, draft);
  }
</script>

<div class="editor">
  <TextInput light hideLabel bind:value={title} />
  <div class="editor" bind:this={target} />
  <Button kind="secondary" on:click={onSubmit}>투고</Button>
</div>

<style>
  .editor {
    background-color: white;
  }

  .editor :global(input) {
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 3rem;
    text-align: center;
  }

  .editor :global(.codex-editor__redactor) {
    padding-top: 1rem;
    padding-bottom: 1rem !important;
  }

  .editor :global(.ce-inline-toolbar) {
    border-radius: 0px;
  }

  .editor > :global(button) {
    width: 100%;
    max-width: initial;
    display: flex;
    justify-content: flex-end;
  }
</style>
