<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import type { MassIntention } from '../../types/content';

const props = defineProps<{ intentions: MassIntention[]; initialToday: string }>();
const today = ref(props.initialToday);
const selected = ref(props.initialToday);
const mode = ref<'week' | 'month'>('week');
const ready = ref(false);
const date = (key: string) => new Date(`${key}T12:00:00Z`);
const key = (value: Date) => value.toISOString().slice(0, 10);
const addDays = (value: Date, days: number) => new Date(value.getTime() + days * 86400000);
const format = (value: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('pl-PL', { ...options, timeZone: 'UTC' }).format(value);
const fullDate = (value: string) => format(date(value), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const anchor = computed(() => date(selected.value));
const start = computed(() => mode.value === 'week'
  ? addDays(anchor.value, -((anchor.value.getUTCDay() + 6) % 7))
  : new Date(Date.UTC(anchor.value.getUTCFullYear(), anchor.value.getUTCMonth(), 1, 12)));
const end = computed(() => mode.value === 'week' ? addDays(start.value, 6)
  : new Date(Date.UTC(anchor.value.getUTCFullYear(), anchor.value.getUTCMonth() + 1, 0, 12)));
const title = computed(() => mode.value === 'month'
  ? format(start.value, { month: 'long', year: 'numeric' })
  : `${format(start.value, { day: 'numeric', month: 'long' })} – ${format(end.value, { day: 'numeric', month: 'long', year: 'numeric' })}`);
const byDate = computed(() => {
  const groups = new Map<string, MassIntention[]>();
  for (const item of props.intentions) {
    const items = groups.get(item.date) ?? [];
    items.push(item);
    groups.set(item.date, items);
  }
  for (const items of groups.values()) items.sort((a, b) => a.time.localeCompare(b.time));
  return groups;
});
const periodDays = computed(() => Array.from({ length: mode.value === 'week' ? 7 : end.value.getUTCDate() }, (_, i) => key(addDays(start.value, i))));
const hasEntries = computed(() => periodDays.value.some(day => byDate.value.has(day)));
const visibleDays = computed(() => mode.value === 'week' ? periodDays.value : periodDays.value.filter(day => byDate.value.has(day)));
const blanks = computed(() => (start.value.getUTCDay() + 6) % 7);
const nearest = computed(() => [...byDate.value.keys()]
  .filter(day => day < key(start.value) || day > key(end.value))
  .sort((a, b) => Math.abs(date(a).getTime() - anchor.value.getTime()) - Math.abs(date(b).getTime() - anchor.value.getTime()))[0]);

function move(direction: number) {
  selected.value = mode.value === 'week' ? key(addDays(anchor.value, direction * 7))
    : key(new Date(Date.UTC(anchor.value.getUTCFullYear(), anchor.value.getUTCMonth() + direction, 1, 12)));
}
async function selectDay(day: string) {
  selected.value = day;
  await nextTick();
  document.getElementById(`intention-day-${day}`)?.focus({ preventScroll: true });
  document.getElementById(`intention-day-${day}`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
}
onMounted(() => {
  today.value = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(new Date());
  selected.value = today.value;
  ready.value = true;
});
</script>

<template>
  <div class="space-y-8">
    <div class="rounded-xl border border-line bg-surface p-4 sm:p-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="inline-flex rounded-lg border border-line bg-white p-1" role="group" aria-label="Zakres intencji">
          <button v-for="view in (['week', 'month'] as const)" :key="view" type="button" :disabled="!ready" :aria-pressed="mode === view" class="min-h-11 rounded-md px-5 text-sm font-semibold" :class="mode === view ? 'bg-navy text-white' : 'text-navy hover:bg-surface'" @click="mode = view">{{ view === 'week' ? 'Tydzień' : 'Miesiąc' }}</button>
        </div>
        <button type="button" :disabled="!ready" class="min-h-11 rounded-lg border border-line bg-white px-4 text-sm font-medium text-navy hover:border-navy" @click="selected = today">Dzisiaj</button>
      </div>
      <div class="mt-5 grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2">
        <button type="button" :disabled="!ready" :aria-label="mode === 'week' ? 'Poprzedni tydzień' : 'Poprzedni miesiąc'" class="h-11 rounded-lg border border-line bg-white text-xl text-navy hover:border-navy" @click="move(-1)">←</button>
        <h2 aria-live="polite" aria-atomic="true" class="text-center text-xl sm:text-2xl">{{ title }}</h2>
        <button type="button" :disabled="!ready" :aria-label="mode === 'week' ? 'Następny tydzień' : 'Następny miesiąc'" class="h-11 rounded-lg border border-line bg-white text-xl text-navy hover:border-navy" @click="move(1)">→</button>
      </div>
      <template v-if="mode === 'month'">
        <div class="mx-auto mt-6 max-w-lg">
          <div class="grid grid-cols-7 text-center text-xs text-muted" aria-hidden="true"><span v-for="day in ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd']" :key="day" class="py-2">{{ day }}</span></div>
          <div class="grid grid-cols-7 gap-y-1">
            <span v-for="blank in blanks" :key="`blank-${blank}`" aria-hidden="true" />
            <button v-for="day in periodDays" :key="day" type="button" :disabled="!byDate.has(day)" :aria-label="`${fullDate(day)}: ${byDate.has(day) ? 'zobacz intencje' : 'brak opublikowanych intencji'}`" :aria-current="day === today ? 'date' : undefined" :aria-pressed="day === selected" class="relative mx-auto flex min-h-11 w-full max-w-12 items-center justify-center rounded-lg pb-1 text-sm tabular-nums" :class="day === selected ? 'bg-navy text-white' : day === today ? 'border border-navy text-navy' : byDate.has(day) ? 'text-navy hover:bg-gold-light/40' : 'text-muted'" @click="selectDay(day)">
              {{ date(day).getUTCDate() }}<span v-if="byDate.has(day)" aria-hidden="true" class="absolute bottom-1.5 h-1 w-1 rounded-full" :class="day === selected ? 'bg-gold-light' : 'bg-gold'" />
            </button>
          </div>
          <p class="mt-3 text-center text-xs text-muted">Kropka oznacza dzień z opublikowanymi intencjami.</p>
        </div>
      </template>
    </div>
    <div v-if="!hasEntries" class="rounded-lg border border-line p-6 text-center" role="status">
      <h3 class="text-xl">Nie opublikowano jeszcze intencji</h3>
      <p class="mt-2 text-muted">Brak wpisów dla wybranego {{ mode === 'week' ? 'tygodnia' : 'miesiąca' }}.</p>
      <button v-if="nearest" type="button" :disabled="!ready" class="mt-4 min-h-11 rounded-lg bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-navy-dark" @click="selected = nearest">Przejdź do najbliższych wpisów</button>
    </div>
    <div v-else class="space-y-7">
      <section v-for="day in visibleDays" :key="day" :aria-labelledby="`intention-day-${day}`">
        <h3 :id="`intention-day-${day}`" tabindex="-1" class="mb-3 scroll-mt-6 text-xl sm:text-2xl">{{ fullDate(day) }} <span v-if="day === today" class="ml-2 inline-block rounded-full bg-gold-light/40 px-3 py-1 align-middle font-sans text-xs font-semibold text-navy">Dzisiaj</span></h3>
        <ul v-if="byDate.has(day)" class="divide-y divide-line rounded-lg border border-line">
          <li v-for="item in byDate.get(day)" :key="item.id" class="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 p-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-5">
            <time :datetime="`${day}T${item.time}`" class="font-semibold text-navy tabular-nums">{{ item.time.slice(0, 5) }}</time>
            <div class="min-w-0 break-words"><p class="whitespace-pre-line">{{ item.intention }}</p><p v-if="item.celebrant" class="mt-2 text-sm text-muted">Celebrans: {{ item.celebrant }}</p></div>
          </li>
        </ul>
        <p v-else class="text-sm text-muted">Brak opublikowanych intencji.</p>
      </section>
    </div>
  </div>
</template>
