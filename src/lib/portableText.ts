import { toHTML } from '@portabletext/to-html';
import { urlFor } from './sanity';

export function renderBody(body: any[]): string {
  if (!body) return '';
  return toHTML(body, {
    components: {
      types: {
        image: ({ value }) => {
          const imgUrl = urlFor(value).width(800).url();
          const caption = value.caption
            ? `<figcaption class="text-center text-sm text-[#8A8A8A] mt-2">${value.caption}</figcaption>`
            : '';
          return `<figure class="my-6"><img src="${imgUrl}" alt="${value.alt ?? ''}" class="rounded-xl w-full" loading="lazy" />${caption}</figure>`;
        },
        callout: ({ value }) => {
          const styles: Record<string, string> = {
            info: 'bg-blue-50 border-blue-200 text-blue-900',
            warning: 'bg-amber-50 border-amber-200 text-amber-900',
            tip: 'bg-green-50 border-green-200 text-green-900',
          };
          const cls = styles[value.type] ?? styles.info;
          return `<div class="border rounded-xl p-4 my-6 text-sm leading-relaxed ${cls}">${value.text}</div>`;
        },
      },
      marks: {
        link: ({ children, value }) => {
          const target = value.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
          return `<a href="${value.href}"${target} class="text-[#B8872B] hover:underline">${children}</a>`;
        },
        strong: ({ children }) => `<strong class="font-semibold text-[#1A1A1A]">${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        code: ({ children }) => `<code class="bg-[#F5F0E8] px-1.5 py-0.5 rounded text-sm font-mono">${children}</code>`,
      },
      block: {
        h2: ({ children }) =>
          `<h2 class="text-2xl font-semibold text-[#1A1A1A] mt-10 mb-4">${children}</h2>`,
        h3: ({ children }) =>
          `<h3 class="text-xl font-semibold text-[#1A1A1A] mt-8 mb-3">${children}</h3>`,
        h4: ({ children }) =>
          `<h4 class="text-lg font-semibold text-[#1A1A1A] mt-6 mb-2">${children}</h4>`,
        normal: ({ children }) =>
          `<p class="text-[#2A2A2A] leading-relaxed mb-4">${children}</p>`,
        blockquote: ({ children }) =>
          `<blockquote class="border-l-4 border-[#B8872B] pl-4 my-6 text-[#4A4A4A] italic">${children}</blockquote>`,
      },
      list: {
        bullet: ({ children }) =>
          `<ul class="list-disc list-inside space-y-1 mb-4 text-[#2A2A2A]">${children}</ul>`,
        number: ({ children }) =>
          `<ol class="list-decimal list-inside space-y-1 mb-4 text-[#2A2A2A]">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }) => `<li class="leading-relaxed">${children}</li>`,
        number: ({ children }) => `<li class="leading-relaxed">${children}</li>`,
      },
    },
  });
}
