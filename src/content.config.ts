import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string().min(1),
    featuredImage: z.string().optional(),
    address: z.string().nullish(),
    postal_address: z.string().nullish(),
    phone: z.string().nullish(),
    email: z.string().nullish(),
    office_hours: z.string().nullish(),
    source_url: z.string().nullish(),
    noindex: z.boolean().default(false),
    sacraments: z.array(z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      title: z.string().min(1),
      description: z.string().min(1),
      preparation: z.string().min(1),
      documents: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { pages };
