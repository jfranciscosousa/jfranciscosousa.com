const moment = require("moment");
const markdownIt = require("markdown-it");

module.exports = {
  formatDate: (date) => {
    return moment(date).format("MMMM D, YYYY");
  },

  sliceArray: (array, start, end) => {
    return array.slice(start, end);
  },

  readingTime: (content) => {
    const wordsPerMinute = 240;
    const words = content.split(" ").length;

    if (words <= 0) return 0;

    return Math.ceil(words / wordsPerMinute);
  },

  markdown: (content) => {
    return markdownIt().renderInline(content);
  },

  ifEqual: (result, a, b) => {
    console.log(a, b)
    return a == b ? result : null;
  },
};
