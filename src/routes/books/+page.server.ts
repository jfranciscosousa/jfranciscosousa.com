import { getReadBooks } from '$lib/backend/books';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const books = await getReadBooks();

	return {
		books
	};
};
