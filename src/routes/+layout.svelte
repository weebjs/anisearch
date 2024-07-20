<script>
	import Header from './Header.svelte';
	import { DarkMode } from 'flowbite-svelte';
	import '../app.css';
</script>

<div class="app">

	<main>
		<slot></slot>
	</main>

	
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

body {
	font-family: "Inter", sans-serif;
}
</style>


