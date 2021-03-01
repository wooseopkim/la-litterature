<script lang="ts">
  import firebase from 'firebase/app';
  import { collections } from '../../../../adapters/network/firebase-shortcut';
  import type Post from '../../../../adapters/network/posts/Post';
  import readPosts from '../../../../usecases/posts/readPosts';
  
  const placeholderCount = 4;
  const placeholderSize = 8;

  export let editable = false;

  let readPostsResult = Promise.race<Post[]>(null);
  let posts: Post[] = [];

  readMorePosts();
  
  function readMorePosts() {
    const last = posts[posts.length - 1]?.created || firebase.firestore.Timestamp.now();
    readPostsResult = readPosts(collections.posts, last)
      .then((x) => posts = [...posts, ...x]);
  }
</script>

<section>
  {#if editable}
    <slot name="editor">편집기</slot>
  {/if}
  {#each posts as post}
    <slot name="item" item={post} />
  {/each}
  {#await readPostsResult}
    {#each new Array(placeholderCount) as _}
      <slot name="placeholder" size={placeholderSize} />
    {/each}
  {/await}
  <slot name="button" load={readMorePosts} />
</section>

<style>
  section {
    padding-top: 1rem;
    padding-bottom: 50vh;
    width: 60em;
  }

  @media screen and (max-width: 60em) {
    section {
      width: 100%;
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media screen and (max-width: 40em) {
    section {
      padding-left: 0rem;
      padding-right: 0rem;
    }
  }

  section > :global(*) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  section > :global(.skeleton) {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
</style>
