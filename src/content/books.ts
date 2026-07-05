import { HARDCOVER_TOKEN } from "astro:env/server";

const API_URL = "https://api.hardcover.app/v1/graphql";
const USER_ID = 102974;

export type Book = {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  isbn: string | undefined;
  imageUrl: string | undefined;
  reviewUrl: string;
  readAt: string;
  rating: string;
  url: string;
};

type HardcoverRead = {
  finished_at: string | null;
  user_book: {
    id: number;
    rating: number | null;
    book: {
      id: number;
      title: string;
      slug: string;
      contributions: {
        author: { name: string };
      }[];
      default_cover_edition: {
        isbn_13: string | null;
        image: { url: string } | null;
      } | null;
    };
  };
};

function parseReadsIntoBooks(readings: HardcoverRead[]): Book[] {
  return readings
    .filter((r) => r.finished_at)
    .map((r) => {
      const book = r.user_book.book;
      const slug = book.slug;
      const bookUrl = `https://hardcover.app/books/${slug}`;
      const cover = book.default_cover_edition;

      return {
        id: r.user_book.id.toString(),
        title: book.title.trim(),
        shortTitle: book.title.trim(),
        author: book.contributions[0]?.author.name ?? "Unknown",
        isbn: cover?.isbn_13 ?? undefined,
        imageUrl: cover?.image?.url ?? undefined,
        reviewUrl: bookUrl,
        readAt: r.finished_at!,
        rating: r.user_book.rating?.toString() ?? "0",
        url: bookUrl,
      };
    });
}

const QUERY = `
  query GetReadBooks($userId: Int!) {
    user_book_reads(
      where: { user_book: { user_id: { _eq: $userId } }, finished_at: { _is_null: false } }
      order_by: { finished_at: desc }
    ) {
      finished_at
      user_book {
        id
        rating
        book {
          id
          title
          slug
          contributions(limit: 1) {
            author {
              name
            }
          }
          default_cover_edition {
            isbn_13
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export async function getReadBooks(): Promise<Book[]> {
  if (!HARDCOVER_TOKEN) {
    console.warn("Skipping book generation by using a fake book");

    return [
      {
        author: "Fake",
        id: "fake",
        imageUrl: "fake",
        isbn: "fake",
        rating: "fake",
        url: "fake",
        reviewUrl: "fake",
        readAt: new Date().toISOString(),
        title: "fake",
        shortTitle: "fake",
      },
    ];
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: HARDCOVER_TOKEN,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { userId: USER_ID },
      }),
    });

    if (!response.ok) {
      console.error("Error from Hardcover, status: ", response.status);
      console.error(await response.text());
      throw new Error("Error from Hardcover");
    }

    const json = await response.json();

    if (json.errors) {
      console.error("GraphQL errors from Hardcover:", json.errors);
      throw new Error("GraphQL error from Hardcover");
    }

    const readings: HardcoverRead[] = json.data?.user_book_reads ?? [];

    return parseReadsIntoBooks(readings);
  } catch (error) {
    console.error("Error while getting books from Hardcover.");
    console.error(error);

    throw error;
  }
}
