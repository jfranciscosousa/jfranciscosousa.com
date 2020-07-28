if (!window.Promise) import("promise-polyfill/src/polyfill");

require("./lib/themeToggle").init();
require("./lib/fontLoader").init();
require("./lib/loadSw").init();
