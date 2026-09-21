import { getDirectusItems, toMedia } from './directus';
import { toPlainText } from '../utils/text';
import type { ParishEvent } from '../types/content';
import type { DirectusFile } from '../types/directus';

interface RawEvent {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  start_date: string;
  end_date?: string | null;
  location?: string | null;
  featured_image?: DirectusFile | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

function mapEvent(item: RawEvent): ParishEvent | undefined {
  if (!item.id || !item.slug || !item.title || !item.start_date) return undefined;
  return {
    id: item.id, slug: item.slug, title: item.title,
    description: toPlainText(item.description), startDate: item.start_date,
    endDate: item.end_date ?? undefined, location: item.location ?? undefined,
    image: toMedia(item.featured_image),
    seo: { title: item.seo_title ?? undefined, description: item.seo_description ?? undefined },
  };
}

export async function getEvents(): Promise<ParishEvent[]> {
  const items = await getDirectusItems<RawEvent>('events', {
    'filter[status][_eq]': 'published', sort: 'start_date',
    fields: 'id,slug,title,description,start_date,end_date,location,featured_image.*,seo_title,seo_description',
  });
  return items.flatMap((item) => {
    const mapped = mapEvent(item);
    return mapped ? [mapped] : [];
  });
}

export async function getEventBySlug(slug: string): Promise<ParishEvent | undefined> {
  return (await getEvents()).find((item) => item.slug === slug);
}

export async function getUpcomingEvents(): Promise<ParishEvent[]> {
  const now = Date.now();
  return (await getEvents()).filter((event) => {
    const end = Date.parse(event.endDate || event.startDate);
    return Number.isFinite(end) && end >= now;
  });
}
