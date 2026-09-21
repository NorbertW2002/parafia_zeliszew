import { getDirectusItems, toMedia } from './directus';
import { toPlainText } from '../utils/text';
import type { ParishGroup } from '../types/content';
import type { DirectusFile } from '../types/directus';

interface RawParishGroup {
  id: string; name: string; description?: string | null; meeting_schedule?: string | null;
  contact_person?: string | null; image?: DirectusFile | null;
}

export async function getParishGroups(): Promise<ParishGroup[]> {
  const items = await getDirectusItems<RawParishGroup>('parish_groups', {
    'filter[status][_eq]': 'published', sort: 'sort,name',
    fields: 'id,name,description,meeting_schedule,contact_person,image.*',
  });
  return items.filter((item) => Boolean(item.id && item.name)).map((item) => ({
    id: item.id, name: item.name, description: toPlainText(item.description),
    meetingSchedule: item.meeting_schedule ?? undefined, contactPerson: item.contact_person ?? undefined,
    image: toMedia(item.image),
  }));
}
