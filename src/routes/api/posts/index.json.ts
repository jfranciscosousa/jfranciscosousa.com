import { getPosts } from "$lib/backend/posts";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	const posts = await getPosts();

	return {
		body: JSON.stringify(posts),
		status: 200,
		headers: {
			"cache-control": "public, s-maxage=604800",
			"content-type": "application/json"
		}
	};
};
