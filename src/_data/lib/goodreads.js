const axios = require("axios");
const xml2js = require("xml2js");

const key = process.env.GOODREADS_API_KEY;
const id = 70151406;

function parseReviews(unparsedReviews) {
  const reviews = unparsedReviews.GoodreadsResponse.reviews[0].review;

  return reviews.map((review) => ({
    id: review.id[0],
    title: review.book[0].title[0],
    short_title: review.book[0].title_without_series[0],
    author: review.book[0].authors[0].author[0].name[0],
    isbn: review.book[0].isbn[0],
    image_url: review.book[0].image_url[0],
    review_url: review.book[0].link[0],
    read_at: review.read_at[0],
    rating: review.rating[0],
    url: review.book[0].link[0],
  }));
}

module.exports = {
  async getReadBooks() {
    const response = await axios.get(
      `https://www.goodreads.com/review/list.xml`,
      {
        params: {
          // eslint-disable-next-line id-length
          v: 2,
          id,
          key,
          shelf: "read",
          per_page: 200,
          sort: "date_read",
        },
      },
    );

    const json = await xml2js.parseStringPromise(response.data);

    return parseReviews(json);
  },
};
