<script lang="ts">
	export let title = 'Home';
	export let description = 'Software engineer. Makes computers do things.';
	export let keywords =
		'francisco, developer, engineer, frontend, backend, fullstack, react, ruby, elixir';
	export let image = null;
</script>

<svelte:head>
	<title>{title} - Francisco Sousa</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	{#if description}<meta name="description" content={description} />{/if}
	<meta name="keywords" content={keywords} />

	<meta content={title} property="og:title" />
	{#if description}<meta content={description} property="og:description" />{/if}
	{#if image}<meta content={image} property="og:image" />{/if}

	<meta content={title} property="twitter:title" />
	{#if description}<meta content={description} property="twitter:description" />{/if}
	{#if image}<meta content={image} property="twitter:image" />{/if}

	<meta content={title} property="twitter:title" />
	{#if description}<meta content={description} property="twitter:description" />{/if}
	{#if image}<meta content={image} property="twitter:image" />{/if}
</svelte:head>
