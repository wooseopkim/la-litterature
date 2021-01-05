<script lang="ts">
  import createPost from '../../../../usecases/posts/createPost';
  import { collections } from '../../../../adapters/network/firebase-shortcut';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';
  import PostStyleProvider from '../PostStyleProvider.svelte';

  let createPostResult = Promise.resolve();
  let submitting = false;

  async function submit(title: string, content: Fragment[], clear: () => void) {
    if (submitting) {
      return;
    }
    createPostResult = createPost(collections.posts, { title, content })
      .then(() => {
        submitting = false;
        clear();
      })
      .catch((e) => {
        submitting = false;
        throw e;
      });
  }
</script>

<div class="editor">
  <div class="title">
    <slot name="title">
      <input />
    </slot>
  </div>
  <PostStyleProvider>
    <slot name="content">
      <textarea />
    </slot>
  </PostStyleProvider>
  <div class="button">
    {#await createPostResult}
      <slot name="loader">로딩</slot>
    {:then}
      <slot name="button" submit={submit} text="투고">
        <button on:click={() => submit('', [], () => {})}>제출</button>
      </slot>
    {:catch}
      <slot name="button" submit={submit} text="재시도">
        <button on:click={() => submit('', [], () => {})}>다시</button>
      </slot>
    {/await}
  </div>
</div>

<style>
  .editor {
    background-color: white;
  }

  .title :global(input) {
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 3rem;
    text-align: center;
  }

  .button :global(button) {
    width: 100%;
    max-width: initial;
    display: flex;
    justify-content: flex-end;
  }
</style>
