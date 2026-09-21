import { getEntry, z } from 'astro:content';
import { getDirectusItems } from './directus';

const sacramentSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  preparation: z.string().trim().min(1),
  documents: z.string().nullable().optional(),
  status: z.literal('published'),
});

export type Sacrament = Omit<z.infer<typeof sacramentSchema>, 'status'>;

export async function getSacraments(): Promise<Sacrament[]> {
  const page = await getEntry('pages', 'sakramenty');
  const fallback = page?.data.sacraments ?? [];
  const items = await getDirectusItems<unknown>('sacraments', {
    'filter[status][_eq]': 'published',
    fields: 'slug,title,description,preparation,documents,status',
  });
  const published = new Map<string, Sacrament>();
  for (const item of items) {
    const result = sacramentSchema.safeParse(item);
    if (result.success) published.set(result.data.slug, result.data);
  }
  return fallback.map((item) => published.get(item.slug) ?? item);
}
