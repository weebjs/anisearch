<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";

  let isOpen = false;

  function toggleSheet() {
    isOpen = !isOpen;
  }
</script>

<header class="flex items-center py-4 px-4 md:container w-full">
  <div class="w-full justify-start items-center">
    <a href="/" class="flex items-center">
      <h3 class="text-lg font-semibold tracking-tight">
        AniDisc
      </h3>
    </a>
  </div>
  
  <nav class="w-full items-center justify-center hidden md:flex">
    <ul class="flex space-x-4">
      <li>
        <a href="/about" class="text-sm font-medium text-foreground hover:text-foreground/80">
          About
        </a>
      </li>
      <li>
        <a href="/experience" class="text-sm font-medium text-foreground hover:text-foreground/80">
          Experience
        </a>
      </li>
    </ul>
  </nav>
  
  <div class="w-full justify-end items-center hidden md:flex space-x-4">
    <a href="/contact">
      <Button>Contact</Button>
    </a>
  </div>
  
  <Sheet.Root bind:open={isOpen}>
    <div class="w-full flex justify-end items-center md:hidden">
      <Button variant="ghost" size="icon" on:click={toggleSheet}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6 text-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
        </svg>
      </Button>
    </div>

    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>
          <a href="/" class="flex items-center gap-2">
            <h3 class="text-lg font-semibold tracking-tight">
              AniDisc
            </h3>
          </a>
        </Sheet.Title>
      </Sheet.Header>
      <nav class="flex flex-col gap-3 mt-4">
        <a href="/" on:click={() => (isOpen = false)}>...</a>
      </nav>
    </Sheet.Content>
  </Sheet.Root>
</header>