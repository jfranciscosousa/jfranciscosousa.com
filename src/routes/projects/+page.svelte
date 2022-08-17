<script>
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo title="Projects" description="Some of my freelancing stuff." />

<div class="prose">
	{@html siteData.pages.projects}
</div>

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
