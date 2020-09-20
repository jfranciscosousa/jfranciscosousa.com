import Pjax from "pjax";

window.addEventListener("DOMContentLoaded", () => {
  window.pjax = new Pjax({
    cacheBust: false,
    elements: "a",
    selectors: ["body", "style"],
  });
});
