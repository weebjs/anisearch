<script lang="ts">
  import Navbar from '$lib/components/ui/Navbar.svelte';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "$lib/components/ui/dialog";
  import { Badge } from "$lib/components/ui/badge";
  import type { AnimeData } from '$lib/components/ui/animeTypes';
  
  let animeModal = false;
  let showError = false;
  let searchInput = '';
  let searchData: AnimeData | null = null;
  let searchResults: AnimeData[] = [];
  let currentIndex = 0;

  async function search() {
    if (searchInput.trim() === '') {
      showError = true;
      return;
    }
    showError = false;
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchInput)}`);
    const data = await response.json();
    searchResults = data.data;
    currentIndex = 0;
    searchData = searchResults[currentIndex];
    animeModal = true;
  }

  function nextAnime() {
    if (currentIndex < searchResults.length - 1) {
      currentIndex++;
      searchData = searchResults[currentIndex];
    }
  }

  function previousAnime() {
    if (currentIndex > 0) {
      currentIndex--;
      searchData = searchResults[currentIndex];
    }
  }
</script>

<Navbar />

<div class="flex flex-col items-center justify-center mt-[10rem] container mx-auto px-4 py-8">
  <div class="space-y-6 text-center">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Anidisc</h2>
      <p class="text-muted-foreground">
        Welcome my fellow weebs, may this service guide <br/> you to finding your favorite anime
      </p>
    </div>

    <div class="flex flex-col items-center space-y-2 w-full max-w-md">
      <Input 
        type="text" 
        placeholder="Enter a name..." 
        bind:value={searchInput} 
        class="w-full" 
        on:input={() => showError = false}
      />
      {#if showError}
        <p class="text-red-500 text-sm w-full text-left">A name is required</p>
      {/if}
      <Button on:click={search} class="w-full">Search</Button>
    </div>
  </div>
</div>

<Dialog bind:open={animeModal}>
  <DialogContent class="max-w-3xl w-full">
    <DialogHeader>
      <DialogTitle class="text-2xl font-bold">{searchData?.title}</DialogTitle>
      <p class="text-sm text-muted-foreground">Result {currentIndex + 1} of {searchResults.length}</p>
    </DialogHeader>
    {#if searchData}
      <div class="space-y-4 max-h-[70vh] overflow-y-auto">
        <div class="flex flex-col md:flex-row gap-4">
          <img src={searchData.images.jpg.image_url} alt={searchData.title} class="w-full md:w-1/3 object-cover rounded-lg" />
          <div class="flex-1">
            <div class="flex flex-wrap gap-2 mb-2">
              <Badge>Type: {searchData.type}</Badge>
              {#if 'episodes' in searchData}
                <Badge>Episodes: {searchData.episodes}</Badge>
                <Badge>Rating: {searchData.rating}</Badge>
              {/if}
              <Badge>Score: {searchData.score}</Badge>
            </div>
            <h3 class="text-lg font-semibold mb-2">Synopsis</h3>
            <p class="text-sm text-muted-foreground">{searchData.synopsis}</p>
          </div>
        </div>
      </div>
    {/if}
    <DialogFooter class="flex justify-between">
      <div>
        <Button on:click={previousAnime} disabled={currentIndex === 0}>Previous</Button>
        <Button on:click={nextAnime} disabled={currentIndex === searchResults.length - 1}>Next</Button>
      </div>
      <Button variant="destructive" on:click={() => (animeModal = false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>