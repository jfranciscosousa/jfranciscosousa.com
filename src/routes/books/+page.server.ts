import { getReadBooks } from '$lib/backend/books';

export const load = async () => {
	const books = await getReadBooks();

	return {
		books
	};
};
