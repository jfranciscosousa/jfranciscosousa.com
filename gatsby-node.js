const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.removeLoader("css");

  if (stage === "develop") {
    config.loader("css", {
      test: /\.(scss|css)$/,
      loaders: [
        "style",
        "css?modules&localIdentName=[folder]__[local]__[hash]",
        "postcss",
      ],
    });
  } else {
    config.loader("css", {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract([
        "css?modules&localIdentName=[folder]__[local]__[hash]",
        "postcss",
      ]),
    });
  }

  return config;
};
