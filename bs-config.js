/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  ui: {
    port: 4001,
  },
  port: 4000,
  open: false,
  files: "./dist/**/*",
  server: {
    baseDir: "./dist",
    serveStaticOptions: {
      extensions: ["html"],
    },
  },
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: (snippet, match) => {
        return snippet + match;
      },
    },
  },
};
