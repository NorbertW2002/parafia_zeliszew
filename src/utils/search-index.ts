import { excerpt } from './text';
import type { Announcement, ParishEvent, SearchItem } from '../types/content';

export function buildSearchIndex(
  staticPages: SearchItem[],
  announcements: Announcement[],
  events: ParishEvent[],
): SearchItem[] {
  return [
    ...staticPages,
    ...announcements.map((item) => ({ title: item.title, description: excerpt(item.content), href: `/ogloszenia/${item.slug}`, category: 'Ogłoszenie' })),
    ...events.map((item) => ({ title: item.title, description: excerpt(item.description), href: `/wydarzenia/${item.slug}`, category: 'Wydarzenie' })),
  ];
}
