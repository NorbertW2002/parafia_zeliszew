const polishDate = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long' });
const polishDateTime = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeStyle: 'short' });

export function formatDate(value: string): string {
  return polishDate.format(new Date(value));
}

export function formatDateTime(value: string): string {
  return polishDateTime.format(new Date(value));
}
