<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo />

<div class="prose pt-8">
	<p>
		Hi, I'm Francisco and I'm a fullstack developer that makes websites and computer stuff.
		Currently building shiny things @
		<a target="_blank" rel="noopener" href="https://remote.com">Remote</a>.
	</p>

	<p>
		If you like <a href="/projects">my work</a>, feel free to
		<a rel="external" href="mailto:{siteData.socials.twitter.value}">reach out via email</a>! I can
		work as a freelancer depending on the project (and also the pay).
	</p>

	<p>
		I also <a href="/blog/">write stuff</a>,
		<a href="/projects">build stuff</a> and
		<a href={siteData.socials.github.href}>open-source stuff</a>.
	</p>
</div>
