import { getPosts } from '$lib/backend/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const posts = getPosts();

	return {
		body: posts,
		status: 200,
		headers: {
			'cache-control': 'public, s-maxage=604800'
		}
	};
};
