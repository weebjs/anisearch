<script lang="ts">
  import { Navbar, Kbd, NavBrand, NavUl, Button, Heading, P, Modal, Select } from 'flowbite-svelte';
  import "../../app.css";

  import { SearchSolid } from "flowbite-svelte-icons";

  let waifuModal = false;
  let waifuData: WaifuData | null = null;
  let selectedCategory = 'waifu';

  interface WaifuData {
    images: Array<{
      url: string;
      tags: Array<{
        name: string;
        description: string;
      }>;
    }>;
  }

  const categories = [
    { value: 'waifu', name: 'Waifu' },
    { value: 'oppai', name: 'Oppai' },
  ];

  async function search() {
    const response = await fetch(`https://api.waifu.im/search?included_tags=${selectedCategory}`);
    const data = await response.json();
    waifuData = data;
    waifuModal = true;
  }
</script>

<div class="relative px-8">
  <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
    <NavBrand href="/">
      <div class="flex items-center">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Anidisc</span>
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
          You can also generate some pretty hot waifus, and girls with big oppai! <br>
          Choose an option below, and click submit!
        </P>
      </div>
    </div>
    <div class="flex justify-start items-center mb-6">
      <Select class="w-40 mr-2" items={categories} bind:value={selectedCategory} />
      <Button shadow size="md" on:click={search}><SearchSolid class="w-5 h-5 me-2" /> Submit</Button>
    </div>
  </div>
</div>

<Modal title="Waifu" bind:open={waifuModal} autoclose>
  {#if waifuData && waifuData.images && waifuData.images.length > 0}
    <div>
      <img src={waifuData.images[0].url} alt="Waifu" />
      <div class="mt-4 flex flex-wrap gap-2">
        {#each waifuData.images[0].tags as tag}
          <Kbd class="px-2 py-1.5">{tag.name}</Kbd>
        {/each}
      </div>
    </div>
  {/if}
  <svelte:fragment slot="footer">
    <Button shadow on:click={() => (waifuModal = false)}>Close</Button>
  </svelte:fragment>
</Modal>