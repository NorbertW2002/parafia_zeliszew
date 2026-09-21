import type { DirectusCollectionResponse, DirectusFile, DirectusResponse } from '../types/directus';
import type { Media } from '../types/content';

const directusUrl = import.meta.env.DIRECTUS_URL?.replace(/\/$/, '');
const directusToken = import.meta.env.DIRECTUS_API_TOKEN;
const pagesToken = import.meta.env.DIRECTUS_PAGES_API_TOKEN;


export function isDirectusConfigured(): boolean {
  return Boolean(directusUrl);
}

export async function getDirectusItems<T>(
  collection: string,
  query: Record<string, string> = {},
): Promise<T[]> {
  if (!directusUrl) return [];

  const url = new URL(`/items/${collection}`, directusUrl);
  url.searchParams.set('limit', '-1');
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));

  console.log('[Directus] Request:', url.toString());

  try {
    const token = ['parish_pages', 'sacraments'].includes(collection)
      ? pagesToken || directusToken
      : directusToken;
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    console.log(
        `[Directus] ${collection}:`,
        response.status,
        response.statusText
    );

    if (!response.ok) {
      console.error(
          '[Directus] Response:',
          await response.text()
      );
      return [];
    }

    const body =
        (await response.json()) as DirectusCollectionResponse<T>;

    console.log(
        `[Directus] ${collection}: pobrano`,
        Array.isArray(body.data) ? body.data.length : 0,
        'elementów'
    );

    return Array.isArray(body.data) ? body.data : [];
  } catch (error) {
    console.error('[Directus] Fetch error:', error);
    return [];
  }
}

export async function getDirectusSingleton<T>(
  collection: string,
  query: Record<string, string> = {},
): Promise<T | undefined> {
  if (!directusUrl) return undefined;

  const url = new URL(`/items/${collection}`, directusUrl);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));

  try {
    const response = await fetch(url, {
      headers: directusToken ? { Authorization: `Bearer ${directusToken}` } : {},
    });

    if (!response.ok) {
      console.error(`[Directus] ${collection}: ${response.status} ${response.statusText}`);
      return undefined;
    }

    const body = (await response.json()) as DirectusResponse<T>;
    return body.data;
  } catch (error) {
    console.error(`[Directus] Fetch error for ${collection}:`, error);
    return undefined;
  }
}

export function toMedia(file: DirectusFile | null | undefined): Media | undefined {
  if (!file?.id || !directusUrl) return undefined;

  return {
    id: file.id,
    url: `${directusUrl}/assets/${file.id}`,
    alt: file.description || file.title || file.filename_download || 'Zdjęcie',
    width: file.width ?? undefined,
    height: file.height ?? undefined,
  };
}

export function toAttachment(file: DirectusFile | null | undefined) {
  const media = toMedia(file);
  if (!media) return undefined;

  return {
    id: media.id,
    url: media.url,
    label: file?.title || file?.filename_download || 'Pobierz załącznik',
    alt: media.alt,
    type: file?.type ?? undefined,
  };
}
