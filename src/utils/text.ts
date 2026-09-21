export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return '';

  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(value: string, length = 180): string {
  return value.length <= length ? value : `${value.slice(0, length).trimEnd()}…`;
}
