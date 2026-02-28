export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function estimateReadingTime(body: any[]): number {
  if (!body) return 3;
  const text = body
    .filter((block) => block._type === 'block')
    .map((block) => block.children?.map((c: any) => c.text).join('') ?? '')
    .join(' ');
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
