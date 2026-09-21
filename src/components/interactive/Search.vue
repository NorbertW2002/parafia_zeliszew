<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SearchItem } from '../../types/content';

const props = defineProps<{ items: SearchItem[] }>();
const query = ref('');
const results = computed(() => {
  const normalized = query.value.trim().toLocaleLowerCase('pl-PL');
  if (!normalized) return [];
  return props.items.filter((item) => `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase('pl-PL').includes(normalized)).slice(0, 20);
});
</script>

<template>
  <div><label for="site-search" class="block font-semibold text-navy">Szukaj na stronie</label><input id="site-search" v-model="query" type="search" autocomplete="off" placeholder="Np. sakramenty, pielgrzymka…" class="mt-2 min-h-11 w-full rounded-md border border-line px-4 text-ink" />
    <p v-if="query && !results.length" class="mt-6 text-muted">Nie znaleziono wyników. Spróbuj użyć innego słowa.</p>
    <ul v-if="results.length" class="mt-6 space-y-3" aria-live="polite"><li v-for="result in results" :key="result.href"><a :href="result.href" class="block rounded-md border border-line p-4 no-underline hover:border-gold hover:bg-gold-light"><span class="text-sm font-semibold text-gold">{{ result.category }}</span><strong class="mt-1 block text-lg text-navy">{{ result.title }}</strong><span class="mt-1 block text-muted">{{ result.description }}</span></a></li></ul>
  </div>
</template>
