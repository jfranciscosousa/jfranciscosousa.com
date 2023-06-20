import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkCodeTitles from "remark-code-titles";
import rehypeLazyImage from "rehype-plugin-image-native-lazy-loading";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  experimental: { assets: true },
  image: {
    service: sharpImageService(),
  },
  site: "https://jfranciscosousa.com",
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [rehypeLazyImage],
    extendDefaultPlugins: true,
  },
  integrations: [
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
