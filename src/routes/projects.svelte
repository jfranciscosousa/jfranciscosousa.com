<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
    const response = await fetch(`/api/prismic/projects.json`);
		const json = await response.json();

		return {
			props: {
				content: json.data.content,
				projects: json.data.projects
			},
			cache: {
				maxage: 604800,
				private: false
			}
		};
	};
</script>

<script lang="ts">
	import { asHTML } from "@prismicio/helpers";
	import Seo from "$lib/components/SEO.svelte";
	import siteData from "$lib/siteData";

	export let content: any;
	export let projects: any;
</script>

<Seo title="Projects" description="Some of my freelancing stuff." />

<h2 class="text-2xl mb-8">Projects</h2>

<p class="prose">
	{@html asHTML(content)}
</p>

<ul class="mt-10 space-y-12">
	{#each projects as project}
		<li class="Project">
			<div class="flex flex-row items-center space-x-4 text-accent">
				<a target="_blank" rel="noopener" class="text-xl" href={project.url}>
					{project.name}
				</a>

				{#if project.github}
					<a
						target="_blank"
						rel="noopener"
						class="w-6"
						href={project.github}
						aria-label="GitHub Link"
					>
						{@html siteData.socials.github.icon}
					</a>
				{/if}
			</div>

			<p class="prose">
				{@html asHTML(project.description)}
			</p>

			<small class="mt-2">
				{project.technologies}
			</small>
		</li>
	{/each}
</ul>
