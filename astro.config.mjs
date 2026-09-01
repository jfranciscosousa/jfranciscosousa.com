import { defineConfig, envField, sharpImageService } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkCodeTitles from "remark-code-titles";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  image: {
    service: sharpImageService(),
    layout: "constrained",
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: "always",
  },
  site: "https://jfranciscosousa.com",
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
    processor: unified({
      remarkPlugins: [remarkCodeTitles],
    }),
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.match(/https:\/\/jfranciscosousa\.com\/blog\/.+/),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        strict: false,
      },
    },
  },
  env: {
    schema: {
      HARDCOVER_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});
