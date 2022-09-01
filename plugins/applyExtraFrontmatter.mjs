function calculateReadingTime(content) {
  const wordsPerMinute = 240;
  const words = content.split(" ").length;

  if (words <= 0) return 0;

  return Math.ceil(words / wordsPerMinute);
}

export default function applyExtraFrontmatter() {
  return function (_tree, file) {
    file.data.astro.frontmatter.readingTime = calculateReadingTime(file.value);
  };
}
