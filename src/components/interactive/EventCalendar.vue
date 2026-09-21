<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ParishEvent } from '../../types/content';

const props = defineProps<{ events: ParishEvent[] }>();
const selected = ref(new Date());
const formatter = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' });
const monthLabel = computed(() => formatter.format(selected.value));
const monthEvents = computed(() => props.events.filter((event) => {
  const date = new Date(event.startDate);
  return date.getFullYear() === selected.value.getFullYear() && date.getMonth() === selected.value.getMonth();
}));
function changeMonth(amount: number) { selected.value = new Date(selected.value.getFullYear(), selected.value.getMonth() + amount, 1); }
</script>

<template>
  <section class="rounded-lg border border-line bg-surface p-5" aria-labelledby="calendar-title">
    <div class="flex items-center justify-between gap-4"><button type="button" class="rounded border border-navy px-3 py-2 font-semibold text-navy" aria-label="Poprzedni miesiąc" @click="changeMonth(-1)">←</button><h2 id="calendar-title" class="text-xl capitalize">{{ monthLabel }}</h2><button type="button" class="rounded border border-navy px-3 py-2 font-semibold text-navy" aria-label="Następny miesiąc" @click="changeMonth(1)">→</button></div>
    <ul v-if="monthEvents.length" class="mt-5 space-y-3"><li v-for="event in monthEvents" :key="event.id"><a :href="`/wydarzenia/${event.slug}`" class="block rounded bg-white p-4 text-navy no-underline shadow-sm hover:bg-gold-light"><strong>{{ new Intl.DateTimeFormat('pl-PL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(event.startDate)) }}</strong><span class="ml-2">{{ event.title }}</span></a></li></ul><p v-else class="mt-5 text-muted">W tym miesiącu nie ma zaplanowanych wydarzeń.</p>
  </section>
</template>
