<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import type { WeeklyIntention } from '../../types/content';

const props = defineProps<{ intentions: WeeklyIntention[]; initialToday: string }>();
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
 const groups = new Map<string, WeeklyIntention>();
 for (const week of props.intentions) for (let i=0;i<7;i++) groups.set(key(addDays(date(week.weekStart),i)),week);
 return groups;
});
const periodDays = computed(() => Array.from({ length: mode.value === 'week' ? 7 : end.value.getUTCDate() }, (_, i) => key(addDays(start.value, i))));
const hasEntries = computed(() => periodDays.value.some(day => byDate.value.has(day)));
const visibleWeeks = computed(() => props.intentions.filter(week => week.weekStart <= key(end.value) && week.weekEnd >= key(start.value)));
const weekLabel = (week: WeeklyIntention) => format(date(week.weekStart), {day:'numeric',month:'long',year:'numeric'}) + ' – ' + format(date(week.weekEnd), {day:'numeric',month:'long',year:'numeric'});
const blanks = computed(() => (start.value.getUTCDay() + 6) % 7);
const selectedWeek = computed(() => byDate.value.get(selected.value));
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
  document.getElementById(`intention-week-${byDate.value.get(day)?.weekStart}`)?.focus({ preventScroll: true });
  document.getElementById(`intention-week-${byDate.value.get(day)?.weekStart}`)?.scrollIntoView({ block: 'start', behavior: 'instant' });
}
onMounted(() => {
  today.value = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(new Date());
  const requested = new URLSearchParams(window.location.search).get('tydzien');
  selected.value = requested && props.intentions.some(week => week.weekStart === requested) ? requested : today.value;
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
            <button v-for="day in periodDays" :key="day" type="button" :disabled="!byDate.has(day)" :aria-label="`${fullDate(day)}: ${byDate.has(day) ? 'zobacz intencje na cały tydzień' : 'brak opublikowanych intencji'}`" :aria-current="day === today ? 'date' : undefined" :aria-pressed="day === selected" class="relative mx-auto flex min-h-11 w-full max-w-12 items-center justify-center rounded-lg pb-1 text-sm tabular-nums" :class="day === selected ? 'bg-navy text-white' : day === today ? 'border border-navy text-navy' : byDate.has(day) ? (selectedWeek && byDate.get(day)?.weekStart === selectedWeek.weekStart ? 'bg-gold-light/40 text-navy' : 'text-navy hover:bg-gold-light/40') : 'text-muted'" @click="selectDay(day)">
              {{ date(day).getUTCDate() }}<span v-if="byDate.has(day)" aria-hidden="true" class="absolute bottom-1.5 h-1 w-1 rounded-full" :class="day === selected ? 'bg-gold-light' : 'bg-gold'" />
            </button>
          </div>
          <p class="mt-3 text-center text-xs text-muted">Kropki oznaczają opublikowany plan tygodnia. Wybierz datę, aby przeczytać cały tydzień.</p>
        </div>
      </template>
    </div>
    <div v-if="!hasEntries" class="rounded-lg border border-line p-6 text-center" role="status">
      <h3 class="text-xl">Nie opublikowano jeszcze intencji</h3>
      <p class="mt-2 text-muted">Brak wpisów dla wybranego {{ mode === 'week' ? 'tygodnia' : 'miesiąca' }}.</p>
      <button v-if="nearest" type="button" :disabled="!ready" class="mt-4 min-h-11 rounded-lg bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-navy-dark" @click="selected = nearest">Przejdź do najbliższych wpisów</button>
    </div>
    <div v-else class="space-y-7">
      <section v-for="week in visibleWeeks" :key="week.id" :aria-labelledby="'intention-week-'+week.weekStart" class="rounded-xl border border-line bg-white p-5 sm:p-8">
        <p class="mb-2 text-sm font-semibold text-gold">Intencje na tydzień</p>
        <h3 :id="'intention-week-'+week.weekStart" tabindex="-1" class="scroll-mt-6 text-xl sm:text-2xl">{{ weekLabel(week) }}</h3>
        <p v-if="week.weekStart <= today && week.weekEnd >= today" class="mt-2 text-sm font-semibold text-muted">Bieżący tydzień</p>
        <div class="mt-6 whitespace-pre-wrap break-words border-t border-line pt-6 text-[1.0625rem] leading-8">{{ week.content }}</div>
      </section>
    </div>
  </div>
</template>
