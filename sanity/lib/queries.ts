import {defineQuery} from 'next-sanity'
import { client } from './client';

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, mainImage
}`)

export const POST_QUERY = defineQuery(` *[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  mainImage,
  excerpt,
  body,
  publishedAt,
  "authorName": author->name
}`)

async function getBlogPosts() {
  return await client.fetch(`*[_type == "post"] {
    title,
    slug,
    publishedAt,
    excerpt,
    "authorName": author->name
  }`);
}