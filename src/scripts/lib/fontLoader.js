const FontFaceObserver = require("fontfaceobserver");

module.exports = {
  init: () => {
    const htmlElement = document.documentElement;

    htmlElement.classList.remove("no-js");
    htmlElement.classList.add("has-js");

    function applyHasFont() {
      htmlElement.classList.remove("no-font");
      htmlElement.classList.add("has-font");
    }

    new FontFaceObserver("Mulish", 2000)
      .load()
      .then(() => {
        applyHasFont();
      })
      .catch(() => applyHasFont());
  },
};
