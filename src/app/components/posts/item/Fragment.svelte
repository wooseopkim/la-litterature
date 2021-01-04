<script lang="ts">
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
    <embed src={data.data.embed} />
  {:else if isHeaderFragment(data)}
    <h2>{data.data.text}</h2>
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
</style>
