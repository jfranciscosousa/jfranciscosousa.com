const fs = require("fs");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");

// Create the cache dir
if (!fs.existsSync("cache")) fs.mkdirSync("cache");

module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: imgPath => {
      return `./src/${imgPath}`;
    },
    cacheFile: "./cache/lazyimages.json",
  });

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./dist/styles/");

  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html", "yml"],
    htmlTemplateEngine: "njk",
  };
};
