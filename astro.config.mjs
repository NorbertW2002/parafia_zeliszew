import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://parish-starter.example.invalid';

export default defineConfig({
  site,
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
