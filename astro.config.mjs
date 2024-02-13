import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import netlify from '@astrojs/netlify';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), mdx(), react()],
  adapter: node({
    mode: "standalone"
  }),
  adapter: netlify()
});