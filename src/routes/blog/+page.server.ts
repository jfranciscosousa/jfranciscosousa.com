import { getPosts } from '$lib/backend/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};
