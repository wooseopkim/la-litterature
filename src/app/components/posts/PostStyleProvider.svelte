<div class="provider">
  <slot />
</div>

<style>
  .provider > :global(.fragment),
  .provider :global(.ce-block) {
    margin-bottom: 0.4rem;
  }

  .provider :global(.cdx-block) {
    padding: 0;
  }

  .provider :global(h1),
  .provider :global(h2),
  .provider :global(h3),
  .provider :global(h4),
  .provider :global(h5),
  .provider :global(h6) {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }

  .provider :global(.captioned) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }

  .provider :global(b) {
    font-weight: bold;
  }
  
  .provider :global(i) {
    font-style: italic;
  }

  .provider :global(blockquote) {
    padding: 1rem;
    border: 1px solid;
    background: white;
  }

  .provider :global(hr),
  .provider :global(.ce-delimiter) {
    border: none;
    height: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
    position: relative;
    border-top: double black;
    text-align: left;
  }
  
  .provider :global(.ce-delimiter) {
    padding: 0;
  }

  .provider :global(hr)::after,
  .provider :global(.ce-delimiter)::before {
    content: '§';
    display: inline-block;
    transform: translateY(-0.6em);
    font-size: 1.2rem;
    background: white;
  }

  .provider :global(.ce-delimiter)::before {
    line-height: 1em;
    height: initial;
    letter-spacing: initial;
  }

  .provider :global(img) {
    max-width: 100%;
  }

  .provider :global(embed) {
    width: 100%;
    height: 100%;
  }
</style>