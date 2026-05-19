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
  _updatedAt,
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
  _updatedAt,
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
  _updatedAt,
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
export const getAllAuthorSlugs = groq`*[_type == "author" && defined(slug.current)][].slug.current`

// Sitemap-oriented projections: slug + _updatedAt so XML lastmod reflects
// real edits rather than "today on every build".
export const getAllPostsForSitemap = groq`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`
export const getAllProjectsForSitemap = groq`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`
export const getAllAuthorsForSitemap = groq`*[_type == "author" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`

// ── Service pages ─────────────────────────────────────────────────────
export const getServicePageBySlug = groq`*[_type == "servicePage" && slug.current == $slug && coalesce(language, "en") == $language][0] {
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  language,
  serviceKey,
  heroHeadline,
  heroSubheading,
  body,
  keyBenefits,
  targetIndustries,
  technologies,
  relatedProjectSlugs,
  faq,
  seoTitle,
  seoDescription,
  ogImage
}`

export const getAllServicePageSlugs = groq`*[_type == "servicePage" && defined(slug.current) && coalesce(language, "en") == "en"][].slug.current`

export const getAllServicePages = groq`*[_type == "servicePage" && coalesce(language,"en") == $language] | order(serviceKey asc) {
  _id,
  title,
  "slug": slug.current,
  serviceKey,
  heroSubheading,
  seoDescription,
  ogImage
}`

export const getServicePagesForSitemap = groq`*[_type == "servicePage" && defined(slug.current) && coalesce(language,"en") == "en"]{
  "slug": slug.current,
  _updatedAt
}`

// Batch fetch of related projects by slug list. Used by service detail
// pages to render case-study cards without N+1 queries.
export const getProjectsBySlugs = groq`*[_type == "project" && slug.current in $slugs && coalesce(language, "en") == $language] {
  _id,
  title,
  "slug": slug.current,
  image,
  location,
  year,
  description,
  color
}`

// ── Location pages ────────────────────────────────────────────────────
export const getLocationPageByKeys = groq`*[_type == "locationPage" && serviceKey == $serviceKey && locationKey == $locationKey && coalesce(language, "en") == $language][0] {
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  language,
  serviceKey,
  locationKey,
  locationName,
  heroHeadline,
  heroSubheading,
  body,
  localCaseStudySlug,
  faq,
  seoTitle,
  seoDescription,
  ogImage
}`

export const getAllLocationPageKeys = groq`*[_type == "locationPage" && defined(serviceKey) && defined(locationKey) && coalesce(language, "en") == "en"]{ serviceKey, locationKey }`

export const getLocationPagesForSitemap = groq`*[_type == "locationPage" && defined(serviceKey) && defined(locationKey) && coalesce(language,"en") == "en"]{
  serviceKey,
  locationKey,
  _updatedAt
}`
