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
        path: ["./src/assets/styles"],
      }),

    isProd && require("autoprefixer"),
    ...basePlugins,
    isProd && require("cssnano")({ preset: "advanced" }),
    isProd &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/**/*.njk"],
        safelist: ["no-js", "has-js"],
      }),
  ].filter((plugin) => !!plugin),
};
