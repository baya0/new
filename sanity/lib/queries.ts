import { groq } from 'next-sanity'

export const getAllPosts = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
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

export const getPostBySlug = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
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

export const getAllProjects = groq`*[_type == "project"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
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

export const getProjectBySlug = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
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

export const getAuthorBySlug = groq`*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  avatar,
  linkedin
}`

export const getRecentPosts = groq`*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
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
