const htmlmin = require("html-minifier");

module.exports = {
  htmlmin: (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });

      return minified;
    }

    return content;
  },
};
