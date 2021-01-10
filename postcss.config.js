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

    require("tailwindcss"),

    isProd && require("cssnano")({ preset: "advanced" }),
  ].filter((plugin) => !!plugin),
};
