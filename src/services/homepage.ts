import { getDirectusSingleton } from './directus';
import type { HomepageContent } from '../types/content';
import { toPlainText } from '../utils/text';

interface RawHomepageBase {
  introduction?: string | null;
  featured_announcements?: Array<{ announcements_id?: string }>;
  featured_events?: Array<{ events_id?: string }>;
  featured_galleries?: Array<{ galleries_id?: string }>;
}

interface RawHomepageSchedules {
  mass_schedule?: string | null;
  confession_schedule?: string | null;
  office_hours?: string | null;
  adoration_schedule?: string | null;
}

async function getScheduleField(field: keyof RawHomepageSchedules): Promise<string | undefined> {
  const item = await getDirectusSingleton<RawHomepageSchedules>('homepage', { fields: field });
  const value = item?.[field];
  if (typeof value !== 'string') return undefined;
  return value.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(?:p|div)>/gi, '\n').split(/\r?\n/).map(toPlainText).filter(Boolean).join('\n') || undefined;
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const [item, massSchedule, confessionSchedule, officeHours, adorationSchedule] = await Promise.all([
    getDirectusSingleton<RawHomepageBase>('homepage', {
      fields: 'introduction,featured_announcements.announcements_id,featured_events.events_id,featured_galleries.galleries_id',
    }),
    getScheduleField('mass_schedule'),
    getScheduleField('confession_schedule'),
    getScheduleField('office_hours'),
    getScheduleField('adoration_schedule'),
  ]);

  return {
    introduction: toPlainText(item?.introduction) || undefined,
    massSchedule,
    confessionSchedule,
    officeHours,
    adorationSchedule,
    featuredAnnouncementIds: (item?.featured_announcements ?? []).flatMap((entry) => entry.announcements_id ? [entry.announcements_id] : []),
    featuredEventIds: (item?.featured_events ?? []).flatMap((entry) => entry.events_id ? [entry.events_id] : []),
    featuredGalleryIds: (item?.featured_galleries ?? []).flatMap((entry) => entry.galleries_id ? [entry.galleries_id] : []),
  };
}
