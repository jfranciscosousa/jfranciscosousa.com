import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { getReadBooks } from "./content/books";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    keywords: z.string(),
  }),
});

const bookCollection = defineCollection({
  loader: getReadBooks,
  schema: z.object({
    id: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    author: z.string(),
    isbn: z.string().optional(),
    imageUrl: z.string().optional(),
    reviewUrl: z.string(),
    readAt: z.string(),
    rating: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  book: bookCollection,
};
