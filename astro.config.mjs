import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://jfranciscosousa.com",

  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
    remarkPlugins: [["remark-code-titles", {}]],
  },

  integrations: [
    svelte(),
    tailwind({ config: { applyBaseStyles: false } }),
    mdx(),
  ],
});
