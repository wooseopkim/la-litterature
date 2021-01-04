<script lang="ts">
  import { AspectRatio } from 'carbon-components-svelte';
  import type Fragment from '../../../../adapters/network/posts/fragments/Fragment';
  import { isDelimiterFragment } from '../../../../adapters/network/posts/fragments/DelimiterFragment';
  import { isEmbedFragment } from '../../../../adapters/network/posts/fragments/EmbedFragment';
  import { isHeaderFragment } from '../../../../adapters/network/posts/fragments/HeaderFragment';
  import { isImageFragment } from '../../../../adapters/network/posts/fragments/ImageFragment';
  import { isQuoteFragment } from '../../../../adapters/network/posts/fragments/QuoteFragment';
  import { isTextFragment } from '../../../../adapters/network/posts/fragments/TextFragment';
import PostStyleProvider from '../PostStyleProvider.svelte';

  export let data: Fragment;
</script>

<PostStyleProvider>
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
      <!-- TODO Handle error -->
      <p>?</p>
    {/if}
  </div>
</PostStyleProvider>

<style>
  .fragment {
    margin-bottom: 1rem;
  }
</style>
