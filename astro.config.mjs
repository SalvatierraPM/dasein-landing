// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.daseinfs.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/dashboard') && !page.includes('/type-test'),
    }),
  ],
});
