<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const response = await fetch(`/api/posts/${page.params.slug}.json`);
		const json = await response.json();

		if (response.status === 404)
			return {
				status: 404
			};

		return {
			props: {
				post: json
			},
			maxage: 604800
		};
	};

	export const hydrate = false;
</script>

<script lang="ts">
	import type { Post } from '$lib/backend/posts';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Seo from '$lib/components/SEO.svelte';

	export let post: Post;
</script>

<Seo title={post.data.title} description={post.data.description} keywords={post.data.keywords} />

<div class="flex flex-col min-h-screen p-8 sm:px-4">
	<div class="max-w-3xl w-full mx-auto">
		<Navbar />

		<main class="mt-32 mx-auto max-w-[40rem] flex-grow">
			<h1 class="text-2xl mb-8 font-bold">
				{post.data.title}
			</h1>

			<small>
				{post.data.formattedDate} ・ {post.data.readingTime} min read
			</small>

			<article class="mt-8 prose">
				{@html post.content}
			</article>

			<div class="mt-6 pt-6 border-t border-wash-light border-solid text-center prose">
				<a href="/blog">See more posts</a>

				<p>Want to talk about this? Feel free to reach me on the web:</p>
			</div>
		</main>
	</div>

	<footer class="mt-8">
		<Footer />
	</footer>
</div>
