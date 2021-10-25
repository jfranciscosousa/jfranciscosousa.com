<script>
	import data from '$lib/data';
</script>

<footer>
	<ul class="flex flex-row space-x-4 justify-center">
		{#each Object.values(data.socials) as socialItem}
			<li class="text-accent w-6">
				<a
					class="block"
					target="_blank"
					rel="noopener external"
					href={socialItem.href}
					aria-label={socialItem.name}
				>
					{@html socialItem.icon}
				</a>
			</li>
		{/each}
	</ul>
</footer>
