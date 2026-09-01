<script lang="ts">
  import { onMount } from 'svelte';

  let theme: 'light' | 'dark' = 'light';

  onMount(() => {
    const saved = localStorage.getItem('mazecultured-theme') as 'light' | 'dark' | null;
    const attr = document.body.getAttribute('data-theme') as 'light' | 'dark' | null;
    theme = saved ?? attr ?? 'light';
    document.body.setAttribute('data-theme', theme);
  });

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('mazecultured-theme', theme);
  }

  $: label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
</script>

<button class="theme-toggle" on:click={toggle} aria-label={label} title={label}>
  {#if theme === 'dark'}
    <!-- Moon — proper vector, inherits currentColor -->
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  {:else}
    <!-- Sun — stroke 2px to match brutalist 2px borders -->
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
  {/if}
</button>
