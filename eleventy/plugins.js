const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");

// Create the cache dir
if (!fs.existsSync("cache")) fs.mkdirSync("cache");

module.exports = {
  default: [
    // rss
    [pluginRss],
    // image optimization
    [
      lazyImagesPlugin,
      {
        transformImgPath: (imgPath) => {
          if (imgPath.startsWith("hqttps") || imgPath.startsWith("http")) {
            return imgPath;
          }

          return `./src/${imgPath}`;
        },
        cacheFile: "./cache/lazyimages.json",
      },
    ],
    // code syntax highlight
    [syntaxHighlight],
    // pwa settings
    [
      pluginPWA,
      {
        cacheId: new Date().getTime().toString(),
        cleanupOutdatedCaches: true,
        globDirectory: "./dist",
        globIgnores: ["blog/posts/**/*", "images/**/*"],
      },
    ],
  ],

  production: [],
};
