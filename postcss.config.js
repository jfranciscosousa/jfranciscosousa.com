module.exports = ({ env }) => ({
  plugins: {
    "postcss-import": {},
    precss: {},
    tailwindcss: {},
    autoprefixer: {},
    "@fullhuman/postcss-purgecss":
      env === "production"
        ? {
            content: ["src/**/*.html", "src/**/*.njk"],
            whitelist: ["no-js", "has-js", "no-font", "has-font"],
          }
        : false,
    cssnano: env === "production" ? { preset: "advanced" } : false,
  },
});
