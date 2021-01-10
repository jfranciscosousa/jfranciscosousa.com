module.exports = {
  mount: {
    _output: "/",
    static: "/",
    "assets": "/assets",
  },
  plugins: [
    "@snowpack/plugin-postcss",

    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch --quiet" }],

    [
      "@snowpack/plugin-webpack",
      {
        extendConfig: (config) => ({
          ...config,
          optimization: {
            ...config.optimization,

            runtimeChunk: false,
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
