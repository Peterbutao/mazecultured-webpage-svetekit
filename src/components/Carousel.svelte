<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let slides: Array<{
    bgClass: string;
    sticker: string;
    title: string;
    punchline: string;
  }> = [];

  let track: HTMLDivElement;
  let currentIndex = 0;
  let observer: IntersectionObserver | null = null;
  let interval: ReturnType<typeof setInterval> | null = null;

  function scrollToIndex(idx: number) {
    if (!track) return;
    const els = track.querySelectorAll<HTMLElement>('.slide');
    const target = els[idx];
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft - track.clientWidth / 2 + target.clientWidth / 2,
      behavior: 'smooth'
    });
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      scrollToIndex(currentIndex);
    }, 3200);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
    interval = null;
  }

  onMount(() => {
    const els = Array.from(track.querySelectorAll<HTMLElement>('.slide'));

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            els.forEach((s) => s.classList.remove('is-focused'));
            entry.target.classList.add('is-focused');
            const idx = els.indexOf(entry.target as HTMLElement);
            if (idx !== -1) currentIndex = idx;
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    els.forEach((el) => observer!.observe(el));

    startAuto();

    // restart on resize so centering stays correct
    const onResize = () => scrollToIndex(currentIndex);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  onDestroy(() => {
    stopAuto();
    observer?.disconnect();
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="carousel-wrapper">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="carousel-track"
    bind:this={track}
    on:mouseenter={stopAuto}
    on:mouseleave={startAuto}
    on:touchstart={stopAuto}
  >
    {#each slides as s}
      <div class="slide {s.bgClass}">
        <div class="tape-corner"></div>
        <span class="sticker">{s.sticker}</span>
        <div class="card-title">{s.title}</div>
        <p class="punchline">{s.punchline}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  /* component has no extra CSS — relies on global.css classes */
</style>
