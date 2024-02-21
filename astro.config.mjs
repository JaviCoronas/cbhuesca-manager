import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import netlify from '@astrojs/netlify';
import vercel from '@astrojs/vercel/serverless';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  integrations: [tailwind(), mdx(), react()],
  adapter: node({
    mode: "standalone"
  }),
  adapter: netlify(),
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    maxDuration: 8,
  }),
});