<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
		const response = await fetch(
			`/api/prismic/homepage.json`
		);
		const json = await response.json();

		return {
			props: {
				title: json.data.title,
				descrpiton: json.data.description,
				content: json.data.content
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

	export let title: string;
	export let description: string;
	export let content: any;
</script>

<Seo {title} {description} />

<div class="prose pt-8">
	{@html asHTML(content)}
</div>
