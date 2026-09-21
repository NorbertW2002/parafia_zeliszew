import { getEntry, z } from 'astro:content';
import { getDirectusItems } from './directus';

const optionalText = z.string().nullable().optional();
const pageSchema = z.object({
  slug: z.enum(['kontakt', 'historia']), status: z.literal('published'),
  title: z.string().trim().min(1), description: z.string().trim().min(1), content: z.string().trim().min(1),
  address: optionalText, postal_address: optionalText,
  phone: z.string().regex(/^[+\d\s()-]+$/).nullable().optional(),
  email: z.union([z.string().email(), z.literal('')]).nullable().optional(),
  office_hours: optionalText,
  source_url: z.string().url().refine((url) => /^https?:\/\//.test(url)).nullable().optional(),
});
export type ParishPage = Omit<z.infer<typeof pageSchema>, 'status'>;

export async function getParishPage(slug: 'kontakt' | 'historia'): Promise<ParishPage> {
  const local = await getEntry('pages', slug);
  if (!local) throw new Error(`Missing local page: ${slug}`);
  const fallback: ParishPage = { ...local.data, slug, content: local.body ?? '' };
  const items = await getDirectusItems<unknown>('parish_pages', {
    'filter[status][_eq]': 'published', 'filter[slug][_eq]': slug,
    fields: 'slug,status,title,description,content,address,postal_address,phone,email,office_hours,source_url', limit: '1',
  });
  const parsed = pageSchema.safeParse(items[0]);
  if (!parsed.success || parsed.data.slug !== slug) return fallback;
  if (slug === 'kontakt' && (!parsed.data.address?.trim() || !parsed.data.postal_address?.trim() || !parsed.data.phone?.trim())) return fallback;
  return parsed.data;
}

export function contactLinks(contact: ParishPage) {
  const address = [contact.address, contact.postal_address].filter(Boolean).join(', ');
  return {
    phone: `tel:${(contact.phone ?? '').replace(/[^+\d]/g, '')}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
  };
}
