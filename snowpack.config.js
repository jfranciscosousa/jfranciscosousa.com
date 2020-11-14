module.exports = {
  mount: {
    _output: "/",
    "src/assets": "/assets",
  },
  plugins: [
    "@snowpack/plugin-postcss",

    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],

    [
      "@snowpack/plugin-webpack",
      {
        extendConfig: (config) => ({
          ...config,
          optimization: {
            ...config.optimization,

            splitChunks: {
              chunks: "async",
            },
          },
        }),
      },
    ],
  ],
  buildOptions: {
    clean: true,
    out: "dist",
  },
  devOptions: {
    hmrDelay: 300,
    open: "none",
  },
};
