const basePlugins = [
  require("postcss-custom-media")({
    importFrom: ["./src/assets/styles/misc/breakpoints.css"],
  }),
  require("postcss-media-minmax"),
  require("postcss-nested"),
];

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    isProd &&
      require("postcss-import")({
        resolve: (id, basedir, importOptions) => {
          return "src/assets/styles/" + id;
        },
      }),
    isProd && require("postcss-css-variables"),
    isProd && require("autoprefixer"),
    ...basePlugins,
    isProd && require("cssnano"),
  ].filter((plugin) => !!plugin),
};
