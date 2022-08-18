import rss from "@astrojs/rss";
import { convert } from "rel-to-abs";

const postImportResult = import.meta.glob("../../blog/**.md", { eager: true });
const posts = Object.values(postImportResult);

export const get = () =>
  rss({
    title: "Francisco Sousa's blog",
    description: "My thoughts on making computers do stuff.",
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      link: post.url,
      description: convert(post.compiledContent(), import.meta.env.SITE),
      author: "Francisco Sousa",
    })),
  });
