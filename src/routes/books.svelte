<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/books.json');
		const json = await response.json();

		return {
			props: {
				books: json
			}
		};
	};

	export const hydrate = false;
	export const prerender = true;
</script>

<script lang="ts">
	import type { Book } from '$lib/backend/books';

	export let books: Book[];
</script>

<h2 class="text-2xl mb-8">Stuff I've read</h2>

<p class="prose">
	My personal bookshelf. Not much to say, just wanted to make nice things with the Goodreads API 😛
</p>

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
