import { getPosts } from '$lib/backend/posts';

export const load = async () => {
	const posts = await getPosts();

	return {
		posts
	};
};
