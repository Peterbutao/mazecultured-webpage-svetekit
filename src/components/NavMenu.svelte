<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let menuOpen = false;
  let theme: 'light' | 'dark' = 'light';
  let wrapper: HTMLDivElement;

  onMount(() => {
    const saved = localStorage.getItem('mazecultured-theme') as 'light' | 'dark' | null;
    const attr = document.body.getAttribute('data-theme') as 'light' | 'dark' | null;
    theme = saved ?? attr ?? 'light';
    document.body.setAttribute('data-theme', theme);

    const onClickOutside = (e: MouseEvent) => {
      if (menuOpen && wrapper && !wrapper.contains(e.target as Node)) {
        menuOpen = false;
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') menuOpen = false;
    };
    document.addEventListener('click', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggleMenu(e: MouseEvent) {
    e.stopPropagation();
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function toggleTheme(e: MouseEvent) {
    e.stopPropagation();
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('mazecultured-theme', theme);
  }

  $: themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
</script>

<div class="nav-menu" bind:this={wrapper}>
  <button class="menu-btn" on:click={toggleMenu} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="maze-nav">
    {#if menuOpen}
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6L18 18M6 18L18 6" /></svg>
    {:else}
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
    {/if}
    <span class="menu-btn-text">MENU</span>
  </button>

  {#if menuOpen}
    <nav id="maze-nav" class="nav-dropdown" role="navigation" aria-label="Main">
      <div class="nav-section-label">Navigate</div>
      <a href="/" class="nav-link" on:click={closeMenu}><span>MAZE / HOME</span><span>↗</span></a>
      <a href="/projects" class="nav-link" on:click={closeMenu}><span>PROJECTS</span><span>→</span></a>
      <a href="/articles" class="nav-link" on:click={closeMenu}><span>ARTICLES</span><span>→</span></a>

      <div class="menu-divider"></div>

      <div class="nav-section-label">Appearance</div>
      <button class="theme-toggle-in-menu" on:click={toggleTheme} aria-label={themeLabel} title={themeLabel}>
        {#if theme === 'dark'}
          <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          <!-- <span>Light mode</span> -->
        {:else}
          <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
          <!-- <span>Dark mode</span> -->
        {/if}
      </button>
    </nav>
  {/if}
</div>

<style>
  /* no extra needed - uses global.css */
</style>
