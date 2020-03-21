const fs = require("fs");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const htmlmin = require("html-minifier");

// Create the cache dir
if (!fs.existsSync("cache")) fs.mkdirSync("cache");

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: imgPath => {
      return `./src/${imgPath}`;
    },
    cacheFile: "./cache/lazyimages.json",
  });

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(
      cacheBuster({
        outputDirectory: "dist",
      }),
    );
  }

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./dist/styles/");

  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
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
  });

  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
  };
};
