const pluginRss = require("@11ty/eleventy-plugin-rss");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const pluginPWA = require("eleventy-plugin-pwa");

const CACHEBUSTER_HASH = Date.now();

module.exports = {
  default: [
    // rss
    [pluginRss],
    // image optimization
    [
      lazyImagesPlugin,
      {
        transformImgPath: (imgPath) => {
          if (imgPath.startsWith("https") || imgPath.startsWith("http")) {
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

  production: [
    [
      cacheBuster({
        createResourceHash(_outputDirectoy, _url, _target) {
          return CACHEBUSTER_HASH;
        },
        outputDirectory: "dist",
      }),
    ],
  ],
};
