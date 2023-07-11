import { parseStringPromise } from "xml2js";

const key = import.meta.env.GOODREADS_API_KEY;
const id = "70151406";

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
  if (CACHED_BOOKS) return CACHED_BOOKS;

  try {
    const query = new URLSearchParams({
      v: "2",
      id,
      key,
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
    const text = await response.text();
    const json = await parseStringPromise(text);
    CACHED_BOOKS = parseReviewsIntoBooks(json);

    return CACHED_BOOKS;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
