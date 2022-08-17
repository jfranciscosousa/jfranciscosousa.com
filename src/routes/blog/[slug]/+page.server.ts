import { error } from '@sveltejs/kit';
import { getPost } from '$lib/backend/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.slug);

	if (!post) throw error(404);

	return {
		...post.data,
		content: post.content
	};
};
