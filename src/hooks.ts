import { createTRPCHandle } from 'trpc-sveltekit';
import { router, createContext, responseMeta } from '$lib/backend/trpc';

export const handle = async ({ event, resolve }) => {
	const response = await createTRPCHandle({
		url: '/trpc',
		router,
		createContext,
		responseMeta,
		event,
		resolve
	});

	return response;
};
