import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-02-28',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

// Queries GROQ
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  estimatedReadingTime,
  "categories": categories[]->{ title, slug },
  "author": author->{ name, image, role }
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  updatedAt,
  excerpt,
  metaDescription,
  mainImage,
  estimatedReadingTime,
  body,
  faqItems,
  articleType,
  "categories": categories[]->{ title, slug },
  "author": author->{ name, image, role, bio }
}`;

export const latestPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0..5] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "categories": categories[]->{ title, slug }
}`;
