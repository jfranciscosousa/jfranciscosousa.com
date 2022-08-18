export default function calculateReadingTime(content: string): number {
  const wordsPerMinute = 240;
  const words = content.split(" ").length;

  if (words <= 0) return 0;

  return Math.ceil(words / wordsPerMinute);
}
