<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo addSuffix={false} />

<div class="prose pt-8">
  {@html siteData.pages.home}
</div>
