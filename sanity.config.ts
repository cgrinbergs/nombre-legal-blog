import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'nombre-legal-blog',
  title: 'Nombre Legal — Blog',
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Artículos')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Artículos')),
            S.listItem()
              .title('Autores')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Autores')),
            S.listItem()
              .title('Categorías')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categorías')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
