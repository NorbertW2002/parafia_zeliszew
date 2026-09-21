import { getDirectusItems } from './directus';
import type { MassIntention } from '../types/content';

interface RawMassIntention { id: string; date: string; time: string; intention: string; celebrant?: string | null; }

function getTodayInPoland(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function getMassIntentions(): Promise<MassIntention[]> {
  const items = await getDirectusItems<RawMassIntention>('mass_intentions', {
    'filter[status][_eq]': 'published', sort: 'date,time', fields: 'id,date,time,intention,celebrant',
  });
  return items
    .filter((item) => Boolean(item.id && item.date && item.time && item.intention))
    .map((item) => ({ ...item, celebrant: item.celebrant ?? undefined }));
}

export async function getUpcomingMassIntentions(limit = 4): Promise<MassIntention[]> {
  const today = getTodayInPoland();
  const intentions = await getMassIntentions();
  return intentions.filter((intention) => intention.date >= today).slice(0, limit);
}
