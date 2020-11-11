module.exports = {
  mount: {
    _output: "/",
    "src/assets": "/assets",
  },
  plugins: [
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],
    "@snowpack/plugin-webpack",
  ],
  devOptions: {
    open: "none",
  },
};
