import { getReadBooks } from "$lib/backend/books";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	const posts = await getReadBooks();

	return {
		body: JSON.stringify(posts),
		status: 200,
		headers: {
			"cache-control": "public, s-maxage=604800"
		}
	};
};
