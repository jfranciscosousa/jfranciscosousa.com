const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    isProd && require("postcss-import"),
    require("tailwindcss"),
    isProd && require("cssnano")({ preset: "advanced" }),
  ].filter((plugin) => !!plugin),
};
