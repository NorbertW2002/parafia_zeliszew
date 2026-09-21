import { getDirectusItems, toMedia } from './directus';
import { toPlainText } from '../utils/text';
import type { Priest } from '../types/content';
import type { DirectusFile } from '../types/directus';

interface RawPriest {
  id: string; name: string; role: string; biography?: string | null; email?: string | null; phone?: string | null;
  image?: DirectusFile | null;
  year_started?: number | string | null;
  year_ended?: number | string | null;
}

function parseYear(value: RawPriest['year_started']): number | undefined {
  if (value === null || value === undefined || String(value).trim() === '') return undefined;
  const year = Number(value);
  return Number.isInteger(year) && year > 0 && year <= 9999 ? year : undefined;
}

export async function getPriests(): Promise<Priest[]> {
  const items = await getDirectusItems<RawPriest>('priests', {
    'filter[status][_eq]': 'published', sort: 'sort,name', fields: 'id,name,role,biography,email,phone,image.*,year_started,year_ended',
  });
  return items.filter((item) => Boolean(item.id && item.name && item.role)).map((item) => ({
    id: item.id, name: item.name, role: item.role, biography: toPlainText(item.biography) || undefined,
    email: item.email ?? undefined, phone: item.phone ?? undefined, image: toMedia(item.image),
    yearStarted: parseYear(item.year_started), yearEnded: parseYear(item.year_ended),
  })).sort((a, b) => (b.yearStarted ?? b.yearEnded ?? 0) - (a.yearStarted ?? a.yearEnded ?? 0));
}
