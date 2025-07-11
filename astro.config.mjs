// @ts-check
import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://bdon.github.io',
  base: 'cng-storage-guide',
  integrations: [solidJs()]
});
