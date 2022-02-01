<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import siteData from '$lib/siteData';
</script>

<Seo title="About me" description="My story so far." />

<h2 class="text-2xl mb-8">About me</h2>

<div class="prose">
	<p>
		I&apos;ve been making a living out of web development since my first year of college. Currently,
		I&apos;m a full-stack developer at
		<a target="_blank" rel="noopener" href="https://remote.com">Remote</a>, helping companies employ
		global talent remotely. I've previously worked at
		<a target="_blank" rel="noopener" href="https://finiam.com">Finiam</a>
		, a web development agency specializin fintech and Web3.
	</p>

	<p>
		I tinker with the latest, hottest, juiciest web development frameworks at all the time. The
		industry hates it, I hate it, but I cannot stop. You can check it out here
		<a href={siteData.socials.github.href}>Github profile</a>. There is some useful stuff there
		though, despite everything.
	</p>

	<p>
		Trying to make the web easy to use again. Current obsession: <a
			target="_blank"
			rel="noopener"
			href="https://remix.run">remix.run</a
		>
	</p>
</div>
