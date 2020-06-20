const FontFaceObserver = require("fontfaceobserver");

const htmlElement = document.documentElement;

htmlElement.classList.remove("no-js");
htmlElement.classList.add("has-js");

function applyHasFont() {
  htmlElement.classList.remove("no-font");
  htmlElement.classList.add("has-font");
}

new FontFaceObserver("Muli").load().then(() => {
  applyHasFont();
});

setTimeout(applyHasFont, 2000);
