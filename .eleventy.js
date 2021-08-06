const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const filters = require("./eleventy/filters.js");
const transforms = require("./eleventy/transforms.js");
const plugins = require("./eleventy/plugins.js");

const markdownLib = markdownIt({ html: true }).use(markdownItAttrs);

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

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
  });

  return {
    dir: { input: "site", output: "_output", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "liquid", "md", "html"],
    htmlTemplateEngine: "njk",
  };
};
