const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

const CUSTOM_CACHE_DIR = ".image-cache";

// Create the cache dir
if (!fs.existsSync(CUSTOM_CACHE_DIR)) fs.mkdirSync(CUSTOM_CACHE_DIR);

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
        cacheFile: `${CUSTOM_CACHE_DIR}/lazyimages.json`,
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
      },
    ],
    // cache busting
    [
      cacheBuster({
        outputDirectory: "dist",
      }),
    ],
  ],

  production: [],
};
