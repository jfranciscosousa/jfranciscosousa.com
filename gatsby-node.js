const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.removeLoader("css");

  if (stage === "develop") {
    config.loader("css", {
      test: /\.(scss|css)$/,
      loaders: ["style", "css", "postcss"],
    });
  } else {
    config.loader("css", {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract(["css?minimize", "postcss"]),
    });
  }

  return config;
};
