<script>
	import { Navbar, Kbd, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder, Button, Heading, P, Label, Input, Modal } from 'flowbite-svelte';
  
	let animeModal = false;
	let emptyInputModal = false;
	let animeInput = '';
	let animeData = null;
  
	async function searchAnime() {
	  if (animeInput.trim() === '') {
		emptyInputModal = true;
		return;
	  }
	  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeInput}`);
	  const data = await response.json();
	  animeData = data.data[0];
	  animeModal = true;
	  emptyInputModal = false;
	}
  </script>
  
  <div class="relative px-8">
	<Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
	  <NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AniSearch</span>
	  </NavBrand>
	  <NavUl>
		<Button size="sm">Get started</Button>
	  </NavUl>
	</Navbar>
  
	<div class="text-center mt-[12rem]">
	  <Heading tag="h2" class="mb-4 text-3xl md:text-4xl lg:text-5xl" customSize="text-2xl font-bold md:text-4xl lg:text-5xl">
		Welcome to AniSearch!
	  </Heading>
	  <P class="mb-6 text-center text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
		AniSearch is a website where you get look at information on anime! Just type the anime name below and you'll get the info on it. Simple as that!
	  </P>
	  <div class="flex justify-center mb-6">
		<Input type="text" id="anime_name" placeholder="Enter an anime name..." required class="w-full max-w-md" bind:value={animeInput} />
	  </div>
	  <div class="flex justify-center">
		<Button size="md" on:click={searchAnime}>Search</Button>
	  </div>
	</div>
  </div>
  
  <Modal title="Oops!" bind:open={emptyInputModal} autoclose>
	<p>Please enter an anime name to search.</p>
	<svelte:fragment slot="footer">
	  <Button on:click={() => (emptyInputModal = false)}>Close</Button>
	</svelte:fragment>
  </Modal>
  
  <Modal title={animeData?.title} bind:open={animeModal} autoclose>
	{#if animeData}
	  <div>
		<img src={animeData.images.jpg.image_url} alt={animeData.title} />
		<div class="mt-4">
		  <Kbd class="px-2 py-1.5">Type: {animeData.type}</Kbd>
		  <Kbd class="px-2 py-1.5">Episodes: {animeData.episodes}</Kbd>
		  <Kbd class="px-2 py-1.5">Rating: {animeData.rating}</Kbd>
		  <Kbd class="px-2 py-1.5">Score: {animeData.score}</Kbd>
		</div>
		<P class="mt-6 italic" weight="normal">{animeData.synopsis}</P>
	  </div>
	{/if}
	<svelte:fragment slot="footer">
	  <Button on:click={() => (animeModal = false)}>Close</Button>
	</svelte:fragment>
  </Modal>