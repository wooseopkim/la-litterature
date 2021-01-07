<script lang="ts">
  import createPost, {
    contentEmptyError,
    titleEmptyError,
    titleMaxLength,
    titleTooLongError,
  } from '../../../../usecases/posts/createPost';
  import { collections } from '../../../../adapters/network/firebase-shortcut';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';
  import PostStyleProvider from '../PostStyleProvider.svelte';
  import { authenticatedUser } from '../../../../adapters/data/store';
  import type User from '../../../../adapters/network/users/User';

  let createPostResult = Promise.resolve();
  let submitting = false;
  let user: User;

  authenticatedUser.subscribe((x) => user = x);

  async function submit(title: string, content: Fragment[], clear: () => void) {
    if (submitting) {
      return;
    }
    submitting = true;
    createPostResult = createPost(collections.posts, user, { title, content })
      .then(() => {
        submitting = false;
        clear();
      })
      .catch((e) => {
        submitting = false;
        throw e;
      });
  }

  function getErrorMessage(e: Error): string {
    if (!e) {
      return null;
    }
    switch (e) {
      case titleEmptyError:
        return '제목을 입력해주세요.';
      case contentEmptyError:
        return '내용을 입력해주세요.';
      case titleTooLongError:
        return '제목이 최대 길이를 초과합니다.';
    }
    return '오류가 발생했습니다.';
  }
</script>

<div class="editor">
  <div class="title">
    <slot name="title" maxLength={titleMaxLength} />
  </div>
  <PostStyleProvider>
    <slot name="content" />
  </PostStyleProvider>
  <div class="footer">
    {#await createPostResult}
      <!-- intended empty block -->
    {:catch e}
      <span class="error">
        <slot name="error" error={getErrorMessage(e)} />
      </span>
    {/await}
    <span class="button">
      {#await createPostResult}
        <slot name="loader" />
      {:then}
        <slot name="button" submit={submit} text="투고" />
      {:catch}
        <slot name="button" submit={submit} text="재시도" />
      {/await}
    </span>
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

  .footer {
    display: flex;
  }

  .footer > :first-child {
    flex-grow: 1;
  }
</style>
