import { defineConfig, envField, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkCodeTitles from "remark-code-titles";
import rehypeLazyImage from "rehype-plugin-image-native-lazy-loading";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
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
  experimental: {
    env: {
      schema: {
        GOODREADS_API_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});
