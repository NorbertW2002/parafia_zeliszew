import { getDirectusItems, toMedia } from './directus';
import { toPlainText } from '../utils/text';
import type { Gallery, GalleryImage } from '../types/content';
import type { DirectusFile } from '../types/directus';

interface RawGalleryImage { directus_files_id?: DirectusFile; caption?: string | null; }
interface RawGallery {
  id: string; slug: string; title: string; description?: string | null; published_at: string;
  images?: RawGalleryImage[]; seo_title?: string | null; seo_description?: string | null;
}

function mapImage(item: RawGalleryImage): GalleryImage | undefined {
  const media = toMedia(item.directus_files_id);
  return media ? { ...media, caption: item.caption ?? undefined } : undefined;
}

function mapGallery(item: RawGallery): Gallery | undefined {
  if (!item.id || !item.slug || !item.title || !item.published_at) return undefined;
  return {
    id: item.id, slug: item.slug, title: item.title, description: toPlainText(item.description) || undefined,
    publishedAt: item.published_at,
    images: (item.images ?? []).flatMap((image) => {
      const mapped = mapImage(image);
      return mapped ? [mapped] : [];
    }),
    seo: { title: item.seo_title ?? undefined, description: item.seo_description ?? undefined },
  };
}

export async function getGalleries(): Promise<Gallery[]> {
  const items = await getDirectusItems<RawGallery>('galleries', {
    'filter[status][_eq]': 'published', sort: '-published_at',
    fields: 'id,slug,title,description,published_at,images.directus_files_id.*,images.caption,seo_title,seo_description',
  });
  return items.flatMap((item) => {
    const mapped = mapGallery(item);
    return mapped ? [mapped] : [];
  });
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | undefined> {
  return (await getGalleries()).find((item) => item.slug === slug);
}
