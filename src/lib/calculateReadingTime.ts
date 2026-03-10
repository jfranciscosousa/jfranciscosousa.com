export function calculateReadingTime(content?: string) {
  if (!content) return 0;

  const wordsPerMinute = 240;
  const words = content.split(" ").length;

  if (words <= 0) return 0;

  return Math.ceil(words / wordsPerMinute);
}
