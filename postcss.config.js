module.exports = ({ env }) => ({
  plugins: {
    "postcss-easy-import": {},
    precss: {},
    autoprefixer: {},
    "@fullhuman/postcss-purgecss": {
      content: ["src/**/*.html", "src/**/*.njk", "src/**/*.css"],
      whitelist: ["no-js", "has-js", "no-font", "has-font"],
    },
    cssnano: env === "production" ? { preset: "advanced" } : false,
  },
});
