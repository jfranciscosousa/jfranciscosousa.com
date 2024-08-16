import rss from "@astrojs/rss";
import { convert } from "rel-to-abs";
import { getPosts } from "~/content/posts";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET = async () => {
  const posts = await getPosts();

  return rss({
    title: "Francisco Sousa's blog",
    description: "My thoughts on making computers do stuff.",
    site: import.meta.env.SITE,
    items: await Promise.all(
      posts.map(async (post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        link: post.url,
        description: convert(
          sanitizeHtml(parser.render(post.body)),
          import.meta.env.SITE,
        ),
        author: "Francisco Sousa",
      })),
    ),
  });
};
