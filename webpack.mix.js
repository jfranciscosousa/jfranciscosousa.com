require("laravel-mix-postcss-config");
const mix = require("laravel-mix");

mix
  .postCss("./src/styles/index.css", "./src/_includes/assets/index.css")
  .postCssConfig();

mix.webpackConfig({
  entry: {
    "dist/scripts/index": "./src/scripts/index.js",
    "dist/scripts/pjax": "./src/scripts/pjax.js",
  },

  devtool: process.env.NODE_ENV === "production" ? "none" : "eval",
});

mix.disableNotifications();
