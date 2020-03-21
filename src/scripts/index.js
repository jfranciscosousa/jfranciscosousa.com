const htmlElement = document.documentElement;

htmlElement.className = htmlElement.className.replace(
  /(?:^|\s)no-js(?!\S)/g,
  "has-js",
);
