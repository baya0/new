import { groq } from 'next-sanity'

// All queries that fetch translatable documents accept a $language parameter.
// Documents that have no `language` field set (legacy content authored before
// the i18n plugin was enabled) are treated as English so the catalog never
// goes blank after the plugin ships.

export const getAllPosts = groq`*[_type == "post" && coalesce(language, "en") == $language] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  language,
  excerpt,
  thumbnail,
  category,
  readTime,
  publishedAt,
  "author": author->{
    name,
    "slug": slug.current,
    avatar
  }
}`

export const getPostBySlug = groq`*[_type == "post" && slug.current == $slug && coalesce(language, "en") == $language][0] {
  _id,
  title,
  "slug": slug.current,
  language,
  excerpt,
  thumbnail,
  category,
  readTime,
  publishedAt,
  body,
  seoTitle,
  seoDescription,
  "author": author->{
    name,
    "slug": slug.current,
    avatar,
    role,
    bio,
    linkedin
  }
}`

export const getAllProjects = groq`*[_type == "project" && coalesce(language, "en") == $language] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  language,
  order,
  icon,
  color,
  image,
  images,
  description,
  fullDescription,
  bullets,
  tags,
  location,
  year,
  keyResult,
  seoTitle,
  seoDescription
}`

export const getProjectBySlug = groq`*[_type == "project" && slug.current == $slug && coalesce(language, "en") == $language][0] {
  _id,
  title,
  "slug": slug.current,
  language,
  order,
  icon,
  color,
  image,
  images,
  description,
  fullDescription,
  bullets,
  tags,
  location,
  year,
  keyResult,
  seoTitle,
  seoDescription
}`

export const getAuthorBySlug = groq`*[_type == "author" && slug.current == $slug && coalesce(language, "en") == $language][0] {
  _id,
  name,
  "slug": slug.current,
  language,
  role,
  bio,
  avatar,
  linkedin
}`

export const getRecentPosts = groq`*[_type == "post" && slug.current != $slug && coalesce(language, "en") == $language] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  language,
  excerpt,
  thumbnail,
  category,
  readTime,
  publishedAt,
  "author": author->{
    name,
    "slug": slug.current,
    avatar
  }
}`

export const getAllPostSlugs = groq`*[_type == "post" && defined(slug.current)][].slug.current`
export const getAllProjectSlugs = groq`*[_type == "project" && defined(slug.current)][].slug.current`
