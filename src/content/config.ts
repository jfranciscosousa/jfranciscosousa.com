import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    keywords: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
