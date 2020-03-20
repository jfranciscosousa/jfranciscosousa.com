module.exports = {
  plugins: {
    "postcss-import": {},
    precss: {},
    tailwindcss: {},
    autoprefixer: {},
    "@fullhuman/postcss-purgecss": {
      content: ["src/**/*.html", "src/**/*.njk"]
    },
    cssnano: { preset: "advanced" }
  }
};
