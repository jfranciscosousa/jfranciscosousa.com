(function () {
  const htmlElement = document.documentElement;
  const defaultThemeFromMedia = window.matchMedia(
    "(prefers-color-scheme: dark)",
  )
    ? "dark"
    : "light";
  const defaultThemeFromStorage = window.localStorage.getItem("data-theme");
  const defaultTheme = defaultThemeFromStorage || defaultThemeFromMedia;

  htmlElement.setAttribute("data-theme", defaultTheme);

  window["handleThemeToggle"] = function () {
    const currentTheme = htmlElement.getAttribute("data-theme") || defaultTheme;
    const desiredTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.style.transition = "background-color 0.2s ease-in"
    htmlElement.setAttribute("data-theme", desiredTheme);
    window.localStorage.setItem("data-theme", desiredTheme);
    htmlElement.style.transition = "";
  };
})()
