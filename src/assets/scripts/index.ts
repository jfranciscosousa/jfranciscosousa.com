import initSwHandler from "./lib/initSwHandler";

initSwHandler();

// Add js classes
const htmlElement = document.documentElement;

htmlElement.classList.remove("no-js");
htmlElement.classList.add("has-js");
