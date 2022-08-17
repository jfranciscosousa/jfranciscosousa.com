<script lang="ts">
	import type { PageData } from './$types';
	import Seo from '$lib/components/SEO.svelte';

	export let data: PageData;
</script>

<Seo title="Blog" description="My thoughts on making computers do stuff." />

<div class="mb-8">
	<h2 class="text-2xl mb-8 font-bold">Blog</h2>

	<p>My thoughts on making computers do stuff.</p>
</div>

<ul class="space-y-10">
	{#each data.posts as post}
		<li class="pb-10 border-b border-wash-light border-solid">
			<a href="/blog/{post.slug}" sveltekit:prefetch>
				<h3 class="text-xl text-accent">{post.title}</h3>
			</a>

			<small class="mt-2">
				{post.formattedDate} ・ {post.readingTime} min read
			</small>

			<div class="mt-4 prose">{@html post.description}</div>
		</li>
	{/each}
</ul>
