module.exports = {
  init: () => {
    const htmlElement = document.documentElement;

    htmlElement.classList.remove("no-js");
    htmlElement.classList.add("has-js");
  },
};
