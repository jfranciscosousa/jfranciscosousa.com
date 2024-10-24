export default {
  image: {
    compress: true,
    external: {
      process: "download",
    },
  },
  css: {
    inline_critical_css: true,
  },
  misc: {
    prefetch_links: "in-viewport",
  },
};
