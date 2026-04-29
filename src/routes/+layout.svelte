<script lang="ts">
  import "../app.css";

  let { children } = $props();

  // Enough <img> copies to cover the longest expected edge. CSS overlaps them
  // via negative margin (--tile-overlap in app.css).
  const TILE_COUNT = 40;
</script>

<div class="page-frame" aria-hidden="true">
  <span class="corner tl"></span>
  <span class="corner tr"></span>
  <span class="corner bl"></span>
  <span class="corner br"></span>
  <span class="edge top">
    {#each { length: TILE_COUNT } as _}<img class="tile" src="/border.svg" alt="" />{/each}
  </span>
  <span class="edge bottom">
    {#each { length: TILE_COUNT } as _}<img class="tile" src="/border.svg" alt="" />{/each}
  </span>
  <span class="edge left"
    ><span class="edge-inner">
      {#each { length: TILE_COUNT } as _}<img class="tile" src="/border.svg" alt="" />{/each}
    </span></span
  >
  <span class="edge right"
    ><span class="edge-inner">
      {#each { length: TILE_COUNT } as _}<img class="tile" src="/border.svg" alt="" />{/each}
    </span></span
  >
</div>

{@render children()}
