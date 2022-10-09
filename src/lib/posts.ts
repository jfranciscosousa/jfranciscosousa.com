export interface Post {
  title: string;
  description: string;
  keywords: string;
  date: string;
  readingTime: number;
  url: string;
  rawContent: string;
  compiledContent: string;
}

export function getPosts(): Post[] {
  const postImportResult = import.meta.glob("../pages/blog/**.md", {
    eager: true,
  });

  const posts: Post[] = (Object.values(postImportResult) as any[]).map(
    (post) => {
      return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        keywords: post.frontmatter.keywords,
        date: post.frontmatter.date,
        readingTime: post.frontmatter.readingTime,
        url: post.url,
        rawContent: post.rawContent(),
        compiledContent: post.compiledContent(),
      };
    }
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
