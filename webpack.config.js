const path = require("path");

module.exports = {
  // output -> input
  entry: {
    "./src/_includes/assets/index": "./src/scripts/index.js",
    "./dist/scripts/turbolinks": "./src/scripts/turbolinks.js",
  },

  output: {
    path: path.resolve(__dirname),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
