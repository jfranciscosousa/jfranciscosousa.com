const FontFaceObserver = require("fontfaceobserver");

const htmlElement = document.documentElement;

htmlElement.className = htmlElement.className.replace(/no-js/g, "has-js");

new FontFaceObserver("Muli").load().then(() => {
  htmlElement.className = htmlElement.className.replace(/no-font/g, "has-font");
});
