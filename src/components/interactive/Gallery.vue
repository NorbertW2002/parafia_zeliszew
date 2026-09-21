<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { GalleryImage } from '../../types/content';

const props = defineProps<{ images: GalleryImage[] }>();
const activeIndex = ref<number | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const activeImage = computed(() => activeIndex.value === null ? undefined : props.images[activeIndex.value]);

function open(index: number) { activeIndex.value = index; }
function close() { activeIndex.value = null; }
function previous() { if (activeIndex.value !== null) activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length; }
function next() { if (activeIndex.value !== null) activeIndex.value = (activeIndex.value + 1) % props.images.length; }
function onKeydown(event: KeyboardEvent) {
  if (activeIndex.value === null) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowLeft') previous();
  if (event.key === 'ArrowRight') next();
}

watch(activeIndex, async (value) => {
  document.body.style.overflow = value === null ? '' : 'hidden';
  if (value !== null) { await nextTick(); closeButton.value?.focus(); }
});
onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => { window.removeEventListener('keydown', onKeydown); document.body.style.overflow = ''; });
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <button v-for="(image, index) in images" :key="image.id" type="button" class="group overflow-hidden rounded-lg text-left" :aria-label="`Otwórz zdjęcie: ${image.alt}`" @click="open(index)">
      <img :src="image.url" :alt="image.alt" :width="image.width" :height="image.height" loading="lazy" class="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
    </button>
  </div>
  <Teleport to="body">
    <div v-if="activeImage" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/95 p-4" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia" @click.self="close">
      <button ref="closeButton" type="button" class="absolute right-4 top-4 rounded bg-white px-4 py-2 font-semibold text-navy" @click="close">Zamknij</button>
      <button type="button" class="absolute left-4 rounded bg-white px-4 py-2 font-semibold text-navy" aria-label="Poprzednie zdjęcie" @click="previous">←</button>
      <figure class="max-h-full max-w-5xl"><img :src="activeImage.url" :alt="activeImage.alt" class="max-h-[78vh] w-auto rounded object-contain" /><figcaption v-if="activeImage.caption" class="mt-3 text-center text-white">{{ activeImage.caption }}</figcaption></figure>
      <button type="button" class="absolute right-4 rounded bg-white px-4 py-2 font-semibold text-navy" aria-label="Następne zdjęcie" @click="next">→</button>
    </div>
  </Teleport>
</template>
