import { getCollection, type CollectionEntry } from "astro:content";
import { calculateReadingTime } from "./calculateReadingTime";

export type BlogPost = CollectionEntry<"blog"> & {
  url: string;
  data: {
    readingTime: number;
  };
};

function slugToHref(slug: string) {
  return `/blog/${slug.replace(/\.[^/.]+$/, "")}`;
}

/** Extend collection with custom data */
export async function getPosts(): Promise<BlogPost[]> {
  const entries = await getCollection("blog");

  const posts = Object.values(entries).map((entry) => {
    return {
      ...entry,
      url: slugToHref(entry.slug),
      data: {
        ...entry.data,
        readingTime: calculateReadingTime(entry.body),
      },
    };
  });

  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

export async function getPrevAndLast(
  url: string,
): Promise<[BlogPost | undefined, BlogPost | undefined]> {
  const posts = await getPosts();
  // Ignore trailing slashes
  const postIndex = posts.findIndex(
    (post) => post.url.replace(/\/$/, "") === url.replace(/\/$/, ""),
  );

  if (postIndex < 0) return [undefined, undefined];

  return [posts[postIndex + 1], posts[postIndex - 1]];
}
