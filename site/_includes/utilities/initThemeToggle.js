(function () {
  const htmlElement = document.documentElement;
  const prefersDarkFromMedia = window.matchMedia("(prefers-color-scheme: dark)")
    .matches;
  const prefersDarkFromStorage = window.localStorage.getItem("dark");
  const prefersDark =
    prefersDarkFromStorage === "false" ? false : prefersDarkFromMedia;

  if (prefersDark) htmlElement.classList.add("dark");

  window["handleThemeToggle"] = function () {
    htmlElement.classList.toggle("dark");

    window.localStorage.setItem("dark", htmlElement.classList.contains("dark"));
  };
})();
