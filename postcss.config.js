const basePlugins = [
  require("postcss-custom-media")({
    importFrom: ["./assets/styles/misc/breakpoints.css"],
  }),
  require("postcss-media-minmax"),
  require("postcss-nested"),
];

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    isProd &&
      require("postcss-import")({
        path: ["./assets/styles"],
        resolve: (id, basedir, importOptions) => {
          if (id.startsWith("./")) return id.replace("./", "");

          return id;
        },
      }),

    isProd && require("autoprefixer"),

    ...basePlugins,

    isProd && require("cssnano")({ preset: "advanced" }),
  ].filter((plugin) => !!plugin),
};
