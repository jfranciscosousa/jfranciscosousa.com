import { parseStringPromise } from "xml2js";

const GOODREADS_API_KEY = import.meta.env.GOODREADS_API_KEY;
const ACCOUNT_ID = "70151406";

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

function parseReviewsIntoBooks(unparsedReviews: {
  GoodreadsResponse: { reviews: { review: any[] }[] };
}) {
  const reviews = unparsedReviews.GoodreadsResponse.reviews[0]?.review;

  if (!reviews) return [];

  return Promise.all(
    reviews.map(async (review) => {
      const id = review.book[0].id[0]["_"];
      const isbn =
        typeof review.book[0].isbn[0] === "string"
          ? review.book[0].isbn[0]
          : undefined;
      const isbn13 =
        typeof review.book[0].isbn13[0] === "string"
          ? review.book[0].isbn13[0]
          : undefined;
      const book = {
        id,
        title: review.book[0].title[0],
        shortTitle: review.book[0].title_without_series[0],
        author: review.book[0].authors[0].author[0].name[0],
        isbn: isbn13 || isbn,
        imageUrl: review.book[0].image_url[0],
        reviewUrl: review.book[0].link[0],
        readAt: review.read_at[0],
        rating: review.rating[0],
        url: review.book[0].link[0],
      };

      return book;
    }),
  );
}

export async function getReadBooks(): Promise<Book[]> {
  if (!GOODREADS_API_KEY) {
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

    return parseReviewsIntoBooks(json);
  } catch (error) {
    console.error("Error while getting books from Goodreads.");
    console.error(error);

    throw error;
  }
}
