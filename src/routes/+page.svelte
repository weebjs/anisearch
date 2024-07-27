<script lang="ts">
  import { Navbar, Kbd, NavBrand, NavUl, NavLi, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder, Button, Heading, P, Label, Input, Modal, Select } from 'flowbite-svelte';
  import "../app.css";

  import { SearchSolid, HeartSolid, CameraPhotoSolid } from "flowbite-svelte-icons";

  let animeModal = false;
  let showAlert = false;
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
      showAlert = true;
      return;
    }
    showAlert = false;
    const response = await fetch(`https://api.jikan.moe/v4/${searchType}?q=${searchInput}`);
    const data = await response.json();
    searchData = data.data[0];
    animeModal = true;
  }
</script>

<div class="relative px-8">
  <div class="main-content">
    <div class="text-left flex items-center justify-between">
      <div>
        <Heading tag="h2" class="mb-4 text-3xl md:text-4xl lg:text-5xl" customSize="text-2xl font-bold md:text-4xl lg:text-5xl">
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
    {#if showAlert}
      <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Danger</span>
        <div>
          <span class="font-medium">Ensure that these requirements are met:</span>
            <ul class="mt-1.5 list-disc list-inside">
              <li>A name is required.</li>
              <li>The search field cannot be empty.</li>
            </ul>
        </div>
      </div>
    {/if}
    <div class="flex justify-start mb-3">
      <Button shadow size="md" on:click={search}><SearchSolid class="w-5 h-5 me-2" /> Search</Button>
    </div>
  </div>
</div>

<Modal title={searchData?.title} bind:open={animeModal} autoclose>
  {#if searchData}
    <div>
      <img src={searchData.images.jpg.image_url} alt={searchData.title} />
      <div class="mt-4">
        <Kbd class="kbd-mobile px-2 py-1.5">Type: {searchData.type}</Kbd>
        {#if 'episodes' in searchData}
          <Kbd class="kbd-mobile px-2 py-1.5">Episodes: {searchData.episodes}</Kbd>
          <Kbd class="kbd-mobile px-2 py-1.5">Rating: {searchData.rating}</Kbd>
        {:else if 'chapters' in searchData}
          <Kbd class="kbd-mobile px-2 py-1.5">Chapters: {searchData.chapters}</Kbd>
          <Kbd class="kbd-mobile px-2 py-1.5">Volumes: {searchData.volumes}</Kbd>
        {/if}
        <Kbd class="kbd-mobile px-2 py-1.5">Score: {searchData.score}</Kbd>
      </div>
      <P class="mt-6 italic" weight="normal">{searchData.synopsis}</P>
    </div>
  {/if}
  <svelte:fragment slot="footer">
    <Button shadow on:click={() => (animeModal = false)}>Close</Button>
  </svelte:fragment>
</Modal>