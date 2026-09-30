import { getDirectusItems } from './directus';
import type { WeeklyIntention } from '../types/content';
interface RawWeek { id: string; status: string; week_start: string; content: string; }
export async function getWeeklyIntentions(): Promise<WeeklyIntention[]> {
 const items = await getDirectusItems<RawWeek>('weekly_intentions', { 'filter[status][_eq]': 'published', sort: 'week_start', fields: 'id,status,week_start,content' });
 return items.flatMap(item => {
  if (item.status !== 'published' || typeof item.content !== 'string' || !item.content.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(item.week_start)) return [];
  const start = new Date(item.week_start + 'T12:00:00Z');
  if (!Number.isFinite(start.getTime()) || start.toISOString().slice(0,10) !== item.week_start || start.getUTCDay() !== 1) return [];
  return [{id:item.id, weekStart:item.week_start, weekEnd:new Date(start.getTime()+6*86400000).toISOString().slice(0,10), content:item.content.trim()}];
 });
}
