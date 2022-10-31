import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import remarkCodeTitles from "remark-code-titles";
import rehypeLazyImage from "rehype-plugin-image-native-lazy-loading";
import applyExtraFrontmatter from "./plugins/applyExtraFrontmatter.mjs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jfranciscosousa.com",
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
    remarkPlugins: [remarkCodeTitles, applyExtraFrontmatter],
    rehypePlugins: [rehypeLazyImage],
    extendDefaultPlugins: true,
  },
  integrations: [
    svelte(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.match(/https:\/\/jfranciscosousa\.com\/blog\/.+/),
    }),
  ],
});
