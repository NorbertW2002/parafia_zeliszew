import { getDirectusItems, toAttachment } from './directus';
import { toPlainText } from '../utils/text';
import type { Announcement } from '../types/content';
import type { DirectusFile } from '../types/directus';

interface RawAnnouncement {
  id: string;
  slug: string;
  title: string;
  published_at: string;
  content?: string | null;
  attachments?: Array<{ directus_files_id?: DirectusFile }>;
  seo_title?: string | null;
  seo_description?: string | null;
}

function mapAnnouncement(item: RawAnnouncement): Announcement | undefined {
  if (!item.id || !item.slug || !item.title || !item.published_at) return undefined;
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    publishedAt: item.published_at,
    content: item.content ?? '',
    attachments: (item.attachments ?? []).flatMap((attachment) => {
      const file = toAttachment(attachment.directus_files_id);
      return file ? [file] : [];
    }),
    seo: { title: item.seo_title ?? undefined, description: item.seo_description ?? undefined },
  };
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const items = await getDirectusItems<RawAnnouncement>('announcements', {
    'filter[status][_eq]': 'published',
    sort: '-published_at',
    fields: 'id,slug,title,published_at,content,attachments.directus_files_id.*,seo_title,seo_description',
  });
  return items.flatMap((item) => {
    const mapped = mapAnnouncement(item);
    return mapped ? [mapped] : [];
  });
}

export async function getAnnouncementBySlug(slug: string): Promise<Announcement | undefined> {
  return (await getAnnouncements()).find((item) => item.slug === slug);
}
