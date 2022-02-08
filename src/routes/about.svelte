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
		I've been making a living out of web development since my first year of college. Currently, I'm
		a frontend engineer at
		<a target="_blank" rel="noopener" href="https://remote.com">Remote</a>, helping companies employ
		global talent remotely. I've previously worked at
		<a target="_blank" rel="noopener" href="https://finiam.com">Finiam</a>
		, a web development agency specializin fintech and Web3.
	</p>

	<p>
		I always considered myself a React and Ruby on Rails developer, but I've been working
		professionally with way to many things to limit myself to that publicly 😅
	</p>

	<p>
		I've worked with countless frameworks, libraries and languages, but some of my favorite ones:
		Next.js, Gatbsy, Eleventy, Elixir (mostly with Phoenix), Node.js (mostly with Express), Svelte
		and Remix.run. You can see all of it on my
		<a href={siteData.socials.github.href}>Github profile</a>.
	</p>

	<p>
		My favored terrain is building web applications with Remix or Next.js with a fully serverless
		architecture, making use of
		<a target="_blank" rel="noopener" href="https://vercel.com">Vercel's infraestructure</a>. At
		times, I can opt for the traditional Rails approach. It depends on the job.
	</p>
</div>
