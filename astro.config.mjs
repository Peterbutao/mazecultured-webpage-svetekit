import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  // For Cloudflare Pages static deploy: build -> dist, no adapter needed.
  // If you need SSR/edge, install @astrojs/cloudflare and use adapter: cloudflare()
  vite: {
    // ensure public assets with spaces resolve
    server: { fs: { strict: false } }
  }
});
