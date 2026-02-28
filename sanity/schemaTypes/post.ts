import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Aparece en listados y redes sociales. Máximo 160 caracteres.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción (SEO)',
      type: 'text',
      rows: 2,
      description: 'Si está vacío, se usará el Resumen. Máximo 160 caracteres.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (alt)',
          type: 'string',
          description: 'Importante para SEO y accesibilidad.',
        }),
      ],
    }),
    defineField({
      name: 'articleType',
      title: 'Tipo de artículo',
      type: 'string',
      options: {
        list: [
          { title: 'Guía completa', value: 'guide' },
          { title: 'Preguntas frecuentes', value: 'faq' },
          { title: 'Cuánto cuesta / Cuánto demora', value: 'cost' },
          { title: 'Requisitos / Cómo hacer', value: 'howto' },
          { title: 'Noticia / Actualización legal', value: 'news' },
        ],
        layout: 'radio',
      },
      initialValue: 'guide',
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Última actualización',
      type: 'datetime',
    }),
    defineField({
      name: 'estimatedReadingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir en nueva pestaña',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
        {
          name: 'callout',
          type: 'object',
          title: 'Recuadro destacado',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Tipo',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Advertencia', value: 'warning' },
                  { title: 'Consejo', value: 'tip' },
                ],
                layout: 'radio',
              },
              initialValue: 'info',
            },
            {
              name: 'text',
              type: 'text',
              title: 'Texto',
            },
          ],
          preview: {
            select: { title: 'text', subtitle: 'type' },
          },
        },
      ],
    }),
    defineField({
      name: 'faqItems',
      title: 'Preguntas frecuentes (FAQ)',
      type: 'array',
      description: 'Se renderizan con schema FAQPage para Google.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Pregunta',
          fields: [
            {
              name: 'question',
              type: 'string',
              title: 'Pregunta',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              type: 'text',
              title: 'Respuesta',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: `${author ?? 'Sin autor'} · ${date ? date.slice(0, 10) : 'Sin fecha'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación (más reciente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
