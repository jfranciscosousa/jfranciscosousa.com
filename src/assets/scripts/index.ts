import initSwHandler from "./lib/initSwHandler";
import initThemeToggle from "./lib/initThemeToggle";

initSwHandler();
initThemeToggle();

// Add js classes
const htmlElement = document.documentElement;

htmlElement.classList.remove("no-js");
htmlElement.classList.add("has-js");
