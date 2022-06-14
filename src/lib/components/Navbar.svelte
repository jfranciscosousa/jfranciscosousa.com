<script>
	import { page } from "$app/stores";
	import MoonIcon from "./icons/MoonIcon.svelte";
	import SunIcon from "./icons/SunIcon.svelte";

	function handleThemeToggle() {
		document.documentElement.classList.toggle("dark");

		if (document.documentElement.classList.contains("dark")) {
			window.localStorage.setItem("theme", "dark");
		} else {
			window.localStorage.setItem("theme", "light");
		}
	}
</script>

<nav class="flex flex-row justify-between md:flex-col">
	<div class="flex flex-row items-center justify-between md:mb-4">
		<a class="text-3xl font-semibold font-sans" href="/">Francisco Sousa</a>

		<button
			class="ThemeToggle hidden sm:block"
			title="Toggle dark/light mode"
			on:click={handleThemeToggle}
		/>
	</div>

	<ul class="flex flex-row items-center space-x-4 text-accent">
		<li class:font-bold={$page.url.pathname == "/"}>
			<a sveltekit:prefetch class="hover:opacity-100" href="/">Home</a>
		</li>
		<li class:font-bold={$page.url.pathname == "/about"}>
			<a sveltekit:prefetch class="hover:opacity-100" href="/about">About</a>
		</li>
		<li class:font-bold={$page.url.pathname == "/projects"}>
			<a sveltekit:prefetch class="hover:opacity-100" href="/projects">Projects</a>
		</li>
		<li class:font-bold={$page.url.pathname == "/books"}>
			<a sveltekit:prefetch class="hover:opacity-100" href="/books">Bookshelf</a>
		</li>
		<li class:font-bold={$page.url.pathname == "/blog"}>
			<a sveltekit:prefetch class="hover:opacity-100" href="/blog">Blog</a>
		</li>

		<li aria-hidden="true">
			<button
				class="theme-toggle block sm:hidden"
				title="Toggle dark/light mode"
				on:click={handleThemeToggle}
			>
				<span class="sun-icon"><SunIcon /></span>
				<span class="moon-icon"><MoonIcon /></span>
			</button>
		</li>
	</ul>
</nav>

<style>
	.theme-toggle {
		width: 24px;
		height: 24px;

		border: none;
		cursor: pointer;
	}

	.moon-icon {
		display: none;
	}

	:global(html.dark) .moon-icon {
		display: inline;
	}

	:global(html.dark) .sun-icon {
		display: none;
	}
</style>
