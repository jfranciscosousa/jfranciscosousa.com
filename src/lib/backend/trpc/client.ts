import { browser } from '$app/env';
import type { Router } from '$lib/backend/trpc';
import * as trpc from '@trpc/client';

const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
const trpcClient = (loadFetch?: typeof fetch) =>
	trpc.createTRPCClient<Router>({
		url: loadFetch ? '/trpc' : url,

		...(loadFetch && { fetch: loadFetch })
	});

export default trpcClient;
