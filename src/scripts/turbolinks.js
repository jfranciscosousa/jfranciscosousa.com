/* eslint-disable global-require */
const Turbolinks = require("turbolinks");

window.addEventListener("DOMContentLoaded", () => {
  Turbolinks.start();

  // Require this to prefetch links on hover
  require("instant.page");
});
