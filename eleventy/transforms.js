const { PurgeCSS } = require("purgecss");
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

  purgeInlinedCss: async (content, outputPath) => {
    if (!outputPath.endsWith(".html")) return content;

    const cssPieces = content.match(/<style>(.*)<\/style>/);

    if (!cssPieces) return content;

    const purgeCSSResults = await new PurgeCSS().purge({
      content: [{ raw: content }],
      css: [{ raw: cssPieces[1] }],
      keyframes: true,
      whitelist: ["no-js", "has-js", "no-font", "has-font"],
    });

    return content.replace(
      cssPieces[1],
      `<style>${purgeCSSResults[0].css}</style>`,
    );
  },
};
