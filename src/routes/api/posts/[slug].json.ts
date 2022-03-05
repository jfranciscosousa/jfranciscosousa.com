import { getPost } from '$lib/backend/posts';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post) {
		return { status: 404 };
	}

	return {
		body: JSON.stringify(post),
		status: 200,
		headers: {
			'cache-control': 'public, s-maxage=604800',
			'content-type': 'application/json'
		}
	};
};
