import { parseStringPromise } from "xml2js";
import { getSecret } from "astro:env/server";

const GOODREADS_API_KEY = getSecret("GOODREADS_API_KEY");
const ACCOUNT_ID = "70151406";

export type Book = {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  isbn: string;
  imageUrl: string;
  reviewUrl: string;
  readAt: string;
  rating: string;
  url: string;
};

// Local cache for development
let CACHED_BOOKS: Book[];

function parseReviewsIntoBooks(unparsedReviews: {
  GoodreadsResponse: { reviews: { review: any[] }[] };
}) {
  const reviews = unparsedReviews.GoodreadsResponse.reviews[0]?.review;

  if (!reviews) return [];

  return reviews.map((review) => ({
    id: review.id[0],
    title: review.book[0].title[0],
    shortTitle: review.book[0].title_without_series[0],
    author: review.book[0].authors[0].author[0].name[0],
    isbn: review.book[0].isbn[0],
    imageUrl: review.book[0].image_url[0],
    reviewUrl: review.book[0].link[0],
    readAt: review.read_at[0],
    rating: review.rating[0],
    url: review.book[0].link[0],
  }));
}

export async function getReadBooks(): Promise<Book[]> {
  if (
    import.meta.env.SKIP_BOOKS === "true" ||
    import.meta.env.SKIP_BOOKS === true
  ) {
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

  if (CACHED_BOOKS) return CACHED_BOOKS;

  try {
    const query = new URLSearchParams({
      v: "2",
      id: ACCOUNT_ID,
      key: GOODREADS_API_KEY,
      shelf: "read",
      per_page: "200",
      sort: "date_read",
    } as Record<string, string>);
    const response = await fetch(
      `https://www.goodreads.com/review/list.xml?${query.toString()}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      console.error("Error from Goodreads, status: ", response.status);
      console.error(await response.text());
      throw new Error("Error from goodreads");
    }

    const text = await response.text();
    const json = await parseStringPromise(text);
    CACHED_BOOKS = parseReviewsIntoBooks(json);

    return CACHED_BOOKS;
  } catch (error) {
    console.error("Error while getting books from Goodreads.");
    console.error(error);

    throw error;
  }
}
