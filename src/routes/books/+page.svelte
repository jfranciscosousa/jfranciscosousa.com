<script lang="ts">
	import type { PageData } from './$types';

	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';

	export let data: PageData;
</script>

<Seo title="Bookshelf" description="My personal bookshelf." />

<div class="prose">
	{@html siteData.pages.books}
</div>

<ul class="space-y-4 mt-8">
	{#each data.books as book}
		<li>
			<a class="text-accent" href={book.url} target="_blank" rel="noopener">
				{book.shortTitle}
			</a>

			<span class="prose">by {book.author} </span>
		</li>
	{/each}
</ul>
