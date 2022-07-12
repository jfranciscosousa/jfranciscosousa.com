<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const books = await trpcClient(fetch).query('getReadBooks');

		return {
			props: {
				books
			}
		};
	};
</script>

<script lang="ts">
	import type { Book } from '$lib/backend/books';
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
	import trpcClient from '$lib/backend/trpc/client';

	export let books: Book[];
</script>

<Seo title="Bookshelf" description="My personal bookshelf." />

<div class="prose">
	{@html siteData.pages.books}
</div>

<ul class="space-y-4 mt-8">
	{#each books as book}
		<li>
			<a class="text-accent" href={book.url} target="_blank" rel="noopener">
				{book.shortTitle}
			</a>

			<span class="prose">by {book.author} </span>
		</li>
	{/each}
</ul>
