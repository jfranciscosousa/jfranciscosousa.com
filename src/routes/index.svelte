<script context="module">
	export const hydrate = false;
	export const prerender = true;
</script>

<script lang="ts">
	import data from '$lib/data';
</script>

<div class="prose pt-8">
	<p>
		Hi, I'm Francisco and I'm a fullstack developer that makes websites and computer stuff.
		Currently building shiny things @
		<a target="_blank" rel="noopener" href="https://finiam.com">Finiam</a>.
	</p>

	<p>
		If you like <a href="/projects">my work</a>, feel free to
		<a href="mailto:{data.socials.twitter.value}">reach out via email</a>! I can work as a
		freelancer or hook you up with my company.
	</p>

	<p>
		I also <a href="/blog/">write stuff</a>, make
		<a href="/projects">freelance projects</a> and
		<a href={data.socials.github.href}>open-source stuff</a>.
	</p>
</div>
