const markdownIt = require("markdown-it");
const mila = require("markdown-it-link-attributes");
const filters = require("./eleventy/filters.js");
const transforms = require("./eleventy/transforms.js");
const plugins = require("./eleventy/plugins.js");

const milaOptions = {
  attrs: {
    target: "_blank",
    rel: "noopener noreferrer",
  },
};
const markdownLib = markdownIt({ html: true }).use(mila, milaOptions);

module.exports = (eleventyConfig) => {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Plugins
  plugins.default.forEach((plugin) => {
    eleventyConfig.addPlugin(...plugin);
  });

  // Production plugins
  if (process.env.NODE_ENV === "production") {
    plugins.production.forEach((plugin) => {
      eleventyConfig.addPlugin(...plugin);
    });
  }

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget("./dist/styles/");
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: { input: "src", output: "_output", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
  };
};
