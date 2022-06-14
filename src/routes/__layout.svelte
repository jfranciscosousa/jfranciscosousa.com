<script>
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
</script>

<div class="flex flex-col min-h-screen p-8 sm:px-4">
	<div class="max-w-3xl w-full mx-auto mb-auto">
		<Navbar />

		<main class="mx-auto my-20 max-w-2xl flex-grow">
			<slot />
		</main>
	</div>

	<Footer />
</div>
