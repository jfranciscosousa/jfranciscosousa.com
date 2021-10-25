import { getPost } from '$lib/backend/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	const post = await getPost(request.params.slug);

	if (!post) {
		return { status: 404 };
	}

	return {
		body: post,
		status: 200,
		headers: {
			'cache-control': 'public, s-maxage=604800'
		}
	};
};
