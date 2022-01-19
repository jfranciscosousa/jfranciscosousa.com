<script context="module">
	export const prerender = true;
</script>

<script>
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo title="Projects" description="Some of my freelancing stuff." />

<h2 class="text-2xl mb-8">Projects</h2>

<p class="prose">
	During my free time I often work on some freelancing projects with some designer friends. You can
	check the open source ones (and other misc stuff) on
	<a target="_blank" rel="noopener" href="https://github.com/jfranciscosousa"> GitHub </a>.
</p>

<ul class="mt-10 space-y-12">
	{#each siteData.projects as project}
		<li class="Project">
			<div class="flex flex-row items-center space-x-4 text-accent">
				<a target="_blank" rel="noopener" class="text-xl" href={project.href}>
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
				{@html project.description}
			</p>

			<small class="mt-2">
				{project.tags}
			</small>
		</li>
	{/each}
</ul>
