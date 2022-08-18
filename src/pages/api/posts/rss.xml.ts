import rss from "@astrojs/rss";
import { convert } from "rel-to-abs";
import { getPosts } from "../../../lib/posts";

export const get = () =>
  rss({
    title: "Francisco Sousa's blog",
    description: "My thoughts on making computers do stuff.",
    site: import.meta.env.SITE,
    items: getPosts().map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      link: post.url,
      description: convert(post.compiledContent, import.meta.env.SITE),
      author: "Francisco Sousa",
    })),
  });
