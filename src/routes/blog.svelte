<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/posts.json');
		const json = await response.json();

		return {
			props: {
				posts: json
			}
		};
	};

	export const hydrate = false;
	export const prerender = true;
</script>

<script lang="ts">
	import type { PostData } from '$lib/backend/posts';

	export let posts: PostData[];
</script>

<div class="mb-8">
	<h2 class="text-2xl mb-8">Blog</h2>

	<p>My thoughts on making computers do stuff.</p>
</div>

<ul class="space-y-10">
	{#each posts as post}
		<li class="pb-10 border-b border-wash-light border-solid">
			<a href="/blog/{post.slug}">
				<h3 class="text-xl text-accent">{post.title}</h3>
			</a>

			<small class="mt-2">
				{post.formattedDate} ・ {post.readingTime} min read
			</small>

			<p class="mt-4 prose">{post.description}</p>
		</li>
	{/each}
</ul>
