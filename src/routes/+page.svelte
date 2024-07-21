<script lang="ts">
  import { Navbar, Kbd, NavBrand, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder, Button, Heading, P, Label, Input, Modal, Select } from 'flowbite-svelte';
  import "../app.css";

  import { SearchSolid, HeartSolid } from "flowbite-svelte-icons";

  let animeModal = false;
  let emptyInputModal = false;
  let searchInput = '';
  let searchData: AnimeData | MangaData | null = null;
  let searchType = 'anime';

  interface AnimeData {
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    type: string;
    episodes: number;
    rating: string;
    score: number;
    synopsis: string;
  }

  interface MangaData {
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    type: string;
    chapters: number;
    volumes: number;
    score: number;
    synopsis: string;
  }

  let searchOptions = [
    { value: 'anime', name: 'Anime' },
    { value: 'manga', name: 'Manga' }
  ];

  async function search() {
    if (searchInput.trim() === '') {
      emptyInputModal = true;
      return;
    }
    const response = await fetch(`https://api.jikan.moe/v4/${searchType}?q=${searchInput}`);
    const data = await response.json();
    searchData = data.data[0];
    animeModal = true;
    emptyInputModal = false;
  }
</script>

<div class="relative px-8">
  <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/">
      <div class="flex items-center">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Anidisc</span>
        <img src="src/logo.png" class="ml-2 mb-1 h-9 w-9" alt="logo">
      </div>
    </NavBrand>
    <NavUl>
      <Button shadow size="sm">Support Server</Button>
    </NavUl>
  </Navbar>

  <div class="main-content">
    <div class="text-left flex items-center justify-between">
      <div>
        <Heading tag="h2" class="mb-4 text-1xl md:text-2xl lg:text-5xl" customSize="text-2xl font-bold md:text-4xl lg:text-5xl">
          Anidisc
        </Heading>
        <P class="mb-6 text-left text-lg lg:text-xl dark:text-gray-400" style="margin-left: 0; padding-left: 0;">
          Wanna find info on an anime or manga? No worries! <br>
          With Anidisc, just select the type, enter a name, & you're good to go!
        </P>
      </div>
    </div>
    <div class="flex justify-start mb-6">
      <Select class="w-40 mr-2" items={searchOptions} bind:value={searchType} />
      <Input autocomplete=off type="text" id="search_name" placeholder="Enter a name..." required class="w-full max-w-md" bind:value={searchInput} />
    </div>
    <div class="flex justify-start mb-3">
      <Button shadow size="md" on:click={search}><SearchSolid class="w-5 h-5 me-2" /> Search</Button>
    </div>
  </div>
</div>

<Modal title="Oops!" bind:open={emptyInputModal} autoclose>
  <p>Please enter a name to search.</p>
  <svelte:fragment slot="footer">
    <Button shadow on:click={() => (emptyInputModal = false)}>Close</Button>
  </svelte:fragment>
</Modal>

<Modal title={searchData?.title} bind:open={animeModal} autoclose>
  {#if searchData}
    <div>
      <img src={searchData.images.jpg.image_url} alt={searchData.title} />
      <div class="mt-4">
        <Kbd class="px-2 py-1.5">Type: {searchData.type}</Kbd>
        {#if 'episodes' in searchData}
          <Kbd class="px-2 py-1.5">Episodes: {searchData.episodes}</Kbd>
          <Kbd class="px-2 py-1.5">Rating: {searchData.rating}</Kbd>
        {:else if 'chapters' in searchData}
          <Kbd class="px-2 py-1.5">Chapters: {searchData.chapters}</Kbd>
          <Kbd class="px-2 py-1.5">Volumes: {searchData.volumes}</Kbd>
        {/if}
        <Kbd class="px-2 py-1.5">Score: {searchData.score}</Kbd>
      </div>
      <P class="mt-6 italic" weight="normal">{searchData.synopsis}</P>
    </div>
  {/if}
  <svelte:fragment slot="footer">
    <Button shadow on:click={() => (animeModal = false)}>Close</Button>
  </svelte:fragment>
</Modal>