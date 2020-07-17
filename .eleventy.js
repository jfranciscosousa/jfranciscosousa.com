const fs = require("fs");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const htmlmin = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const mila = require("markdown-it-link-attributes");
const filters = require("./eleventy/filters.js");

// Create the cache dir
if (!fs.existsSync("cache")) fs.mkdirSync("cache");

module.exports = (eleventyConfig) => {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith("https") || imgPath.startsWith("http")) {
        return imgPath;
      }

      return `./src/${imgPath}`;
    },
    cacheFile: "./cache/lazyimages.json",
  });

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addPlugin(
      cacheBuster({
        createResourceHash(outputDirectoy, url, target) {
          return Date.now();
        },
        outputDirectory: "dist",
      }),
    );
  }

  eleventyConfig.addPlugin(syntaxHighlight);

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

  const milaOptions = {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };
  const markdownLib = markdownIt({ html: true }).use(mila, milaOptions);

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
  };
};
