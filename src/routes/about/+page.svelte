<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo title="About me" description="My story so far." />

<div class="prose">
	{@html siteData.pages.about}
</div>
