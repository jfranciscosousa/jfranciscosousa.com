const { PurgeCSS } = require("purgecss");
const { JSDOM } = require("jsdom");
const htmlmin = require("html-minifier");

function contentWithoutStyles(content) {
  const contentDom = new JSDOM(content);

  const styleTags = contentDom.window.document.querySelectorAll("style");

  styleTags.forEach((styleTag) => {
    styleTag.remove();
  });

  return contentDom.serialize();
}

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

    const cleanContent = contentWithoutStyles(content);
    const contentDom = new JSDOM(content);
    const styleTags = contentDom.window.document.querySelectorAll(
      "style[data-purge]",
    );

    for (const styleTag of styleTags) {
      const styles = styleTag.innerHTML;

      const purgeCSSResults = await new PurgeCSS().purge({
        content: [{ raw: cleanContent }],
        css: [{ raw: styles }],
        keyframes: true,
        whitelist: ["no-js", "has-js", "no-font", "has-font"],
        whitelistPatterns: [/data-theme$/, /font-face/],
      });

      if (purgeCSSResults[0].css && purgeCSSResults[0].css !== "") {
        styleTag.innerHTML = purgeCSSResults[0].css;
      } else {
        styleTag.remove();
      }
    }

    return contentDom.serialize();
  },
};
