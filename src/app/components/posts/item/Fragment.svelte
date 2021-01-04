<script lang="ts">
  import { AspectRatio } from 'carbon-components-svelte';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';
  import { isDelimiterFragment } from '../../../../adapters/network/posts/fragments/DelimiterFragment';
  import { isEmbedFragment } from '../../../../adapters/network/posts/fragments/EmbedFragment';
  import { isHeaderFragment } from '../../../../adapters/network/posts/fragments/HeaderFragment';
  import { isImageFragment } from '../../../../adapters/network/posts/fragments/ImageFragment';
  import { isQuoteFragment } from '../../../../adapters/network/posts/fragments/QuoteFragment';
  import { isTextFragment } from '../../../../adapters/network/posts/fragments/TextFragment';

  export let data: Fragment;
</script>

<div class="fragment">
  {#if isTextFragment(data)}
    <!-- TODO Sanitize -->
    <p>{@html data.data.text}</p>
  {:else if isDelimiterFragment(data)}
    <hr />
  {:else if isEmbedFragment(data)}
    <AspectRatio ratio="2x1"><embed src={data.data.embed} /></AspectRatio>
  {:else if isHeaderFragment(data)}
    {#if data.data.level === 1}
      <h1>{data.data.text}</h1>
    {:else if data.data.level === 2}
      <h2>{data.data.text}</h2>
    {:else if data.data.level === 3}
      <h3>{data.data.text}</h3>
    {:else if data.data.level === 4}
      <h4>{data.data.text}</h4>
    {:else if data.data.level === 5}
      <h5>{data.data.text}</h5>
    {:else if data.data.level === 6}
      <h6>{data.data.text}</h6>
    {:else}
      <h2>{data.data.text}</h2>
    {/if}
  {:else if isImageFragment(data)}
    <img src={data.data.url} alt={data.data.caption} />
  {:else if isQuoteFragment(data)}
    <blockquote>{data.data.text}</blockquote>
  {:else}
    <p>?</p>
  {/if}
</div>

<style>
  .fragment {
    margin-bottom: 1rem;
  }

  p > :global(b) {
    font-weight: bold;
  }
  
  p > :global(i) {
    font-style: italic;
  }

  .fragment > :global(blockquote) {
    padding: 1rem;
    border: 1px solid;
    background: white;
  }

  .fragment > :global(hr) {
    border: none;
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: relative;
    border-top: double black;
  }

  .fragment > :global(hr)::after {
    content: '§';
    display: inline-block;
    transform: translateY(-0.6em);
    font-size: 1.2rem;
    background: white;
  }

  .fragment :global(embed) {
    width: 100%;
    height: 100%;
  }
</style>
