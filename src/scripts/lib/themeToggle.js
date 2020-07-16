module.exports = {
  init: () => {
    const htmlElement = document.documentElement;
    const defaultThemeFromMedia = window.matchMedia(
      "(prefers-color-scheme: dark)",
    )
      ? "dark"
      : "light";
    const defaultThemeFromStorage = window.localStorage.getItem("data-theme");
    const defaultTheme = defaultThemeFromStorage || defaultThemeFromMedia;

    htmlElement.setAttribute("data-theme", defaultTheme);

    window.handleThemeToggle = () => {
      const currentTheme =
        htmlElement.getAttribute("data-theme") || defaultTheme;
      const desiredTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", desiredTheme);
      window.localStorage.setItem("data-theme", desiredTheme);
    };
  },
};
