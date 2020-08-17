const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const pluginInlineCss = require("@navillus/eleventy-plugin-inline-css");

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
        globIgnores: ["images/**/*"],
      },
    ],
    // inline css
    [
      pluginInlineCss,
      {
        input: "dist", // look for all stylesheets relative to `./src/assets`
        cleanCss: false, // disable clean-css,
        selector: 'link[rel="stylesheet"][data-inline]',
        purgeCss: {
          whitelist: ["no-js", "has-js", "no-font", "has-font"],
          whitelistPatterns: [/data-theme$/],
        },
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
