/**
 * One-time translation seed.
 *
 * Reads the Arabic and Turkish translations you already wrote in
 * `lib/i18n.ts` and creates matching Sanity documents with `language: "ar"`
 * / `language: "tr"`.
 *
 * Covers:
 *   - Projects: title, desc, fullDesc, bullets, tags, location, keyResult
 *     (full AR/TR text from i18n.ts.{ar,tr}.projects.items)
 *   - Blog posts: title (used as the doc title), excerpt (from `desc`),
 *     category (from `cat`), readTime (from `read`), publishedAt, thumbnail
 *     and author reference inherited from the English doc. The body is
 *     COPIED FROM THE ENGLISH POST as a placeholder — the i18n catalog
 *     only carries the AR/TR list-view metadata, not the full body. Replace
 *     the placeholder body in Studio when you have the translations ready.
 *
 * Idempotent: skips any (slug, language) pair that already exists.
 *
 * Run with:
 *   npm run seed-translations
 *
 * Requires the same SANITY_WRITE_TOKEN as `npm run seed`.
 *
 * NOTE: This intentionally does NOT create translation.metadata documents.
 * The site's queries filter Sanity content by the `language` field directly,
 * so the seeded AR/TR docs are visible on the public site immediately. The
 * tradeoff is that the studio's "Translations" widget won't show the seeded
 * AR/TR as linked siblings of the English doc. For docs seeded by this
 * script, edit each language's document directly from the Studio doc list.
 * For NEW posts/projects added later, use the studio's "Create Arabic
 * version" / "Create Turkish version" buttons — those create properly
 * linked translations.
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnvFile(path: string) {
  if (!existsSync(path)) return
  const contents = readFileSync(path, 'utf8')
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

const cwd = process.cwd()
loadEnvFile(resolve(cwd, '.env.local'))
loadEnvFile(resolve(cwd, '.env'))

import { createClient } from '@sanity/client'
import { translations } from '../lib/i18n'

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) {
    // eslint-disable-next-line no-console
    console.error(`Missing environment variable: ${name}`)
    process.exit(1)
  }
  return v
}

const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET')
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-27'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  // eslint-disable-next-line no-console
  console.error(
    'Missing SANITY_WRITE_TOKEN. Generate one at sanity.io/manage → API → Tokens (Editor) ' +
      'and add it to .env.local as SANITY_WRITE_TOKEN=sk...',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

function randomKey(): string {
  return Math.random().toString(36).slice(2, 14)
}

// ============================================================================
// Portable Text helpers
// ============================================================================

type I18nBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

// For project fullDesc (plain text → paragraphs).
function textToPortableText(text: string | undefined) {
  if (!text) return []
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((para) => ({
      _type: 'block',
      _key: randomKey(),
      style: 'normal',
      markDefs: [],
      children: [
        { _type: 'span', _key: randomKey(), text: para, marks: [] },
      ],
    }))
}

// For blog post body (structured blocks → portable text).
function blocksToPortableText(blocks: I18nBlock[]): unknown[] {
  const out: unknown[] = []
  for (const b of blocks) {
    if (b.type === 'p' || b.type === 'h2') {
      out.push({
        _type: 'block',
        _key: randomKey(),
        style: b.type === 'h2' ? 'h2' : 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: randomKey(), text: b.text, marks: [] }],
      })
    } else if (b.type === 'ul' || b.type === 'ol') {
      const listItem = b.type === 'ul' ? 'bullet' : 'number'
      for (const item of b.items) {
        out.push({
          _type: 'block',
          _key: randomKey(),
          style: 'normal',
          listItem,
          level: 1,
          markDefs: [],
          children: [{ _type: 'span', _key: randomKey(), text: item, marks: [] }],
        })
      }
    }
  }
  return out
}

// ============================================================================
// Projects
// ============================================================================

type TranslatedProject = {
  title: string
  desc: string
  fullDesc?: string
  bullets?: string[]
  tags?: readonly string[]
  location?: string
  keyResult?: string
}

type ExistingProject = {
  _id: string
  order?: number
  slug: { current: string }
  icon?: string
  color?: string
  image?: unknown
  images?: unknown[]
  tags?: string[]
  year?: string
  keyResult?: string
  location?: string
  language?: string
}

async function findEnProject(slug: string): Promise<ExistingProject | null> {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug && coalesce(language, "en") == "en"][0]{
      _id, order, slug, icon, color, image, images, tags, year, keyResult, location, language
    }`,
    { slug },
  )
}

async function findProjectTranslation(slug: string, language: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug && language == $language][0]{ _id }`,
    { slug, language },
  )
}

async function ensureEnProjectLanguage(doc: ExistingProject) {
  if (doc.language === 'en') return
  await client.patch(doc._id).set({ language: 'en' }).commit()
  // eslint-disable-next-line no-console
  console.log(`  patched ${doc.slug.current} → language:"en"`)
}

async function createTranslatedProject(
  enDoc: ExistingProject,
  src: TranslatedProject,
  language: 'ar' | 'tr',
) {
  const doc: { _type: string; [k: string]: unknown } = {
    _type: 'project',
    language,
    order: enDoc.order,
    title: src.title,
    slug: { _type: 'slug', current: enDoc.slug.current },
    icon: enDoc.icon,
    color: enDoc.color,
    image: enDoc.image,
    images: enDoc.images,
    description: src.desc,
    fullDescription: textToPortableText(src.fullDesc),
    bullets: src.bullets ?? [],
    tags: src.tags ? [...src.tags] : enDoc.tags ?? [],
    location: src.location ?? enDoc.location,
    year: enDoc.year,
    keyResult: src.keyResult ?? enDoc.keyResult,
  }
  return client.create(doc)
}

async function seedProjects() {
  const arItems = (translations.ar as unknown as { projects: { items: TranslatedProject[] } })
    .projects.items
  const trItems = (translations.tr as unknown as { projects: { items: TranslatedProject[] } })
    .projects.items
  const enItems = (translations.en as unknown as { projects: { items: TranslatedProject[] } })
    .projects.items

  // eslint-disable-next-line no-console
  console.log(
    `\n=== Projects ===\nSource counts — en: ${enItems.length}, ar: ${arItems.length}, tr: ${trItems.length}`,
  )

  const enDocs = await client.fetch<ExistingProject[]>(
    `*[_type == "project" && coalesce(language, "en") == "en"] | order(order asc){
      _id, order, slug, icon, color, image, images, tags, year, keyResult, location, language
    }`,
  )

  if (enDocs.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('! No English projects found in Sanity. Run `npm run seed` first to skip.')
    return
  }

  for (const en of enDocs) {
    const i = (en.order ?? 0) - 1
    if (i < 0) continue
    const slug = en.slug.current

    // eslint-disable-next-line no-console
    console.log(`\n# ${slug} (order ${en.order})`)

    await ensureEnProjectLanguage(en)

    for (const [lang, items] of [
      ['ar', arItems],
      ['tr', trItems],
    ] as const) {
      const src = items[i]
      if (!src) {
        // eslint-disable-next-line no-console
        console.log(`  ! no ${lang} translation at index ${i}, skipping`)
        continue
      }

      const existing = await findProjectTranslation(slug, lang)
      if (existing) {
        // eslint-disable-next-line no-console
        console.log(`  ✓ ${lang} already exists (${existing._id}), skipping`)
        continue
      }

      const created = await createTranslatedProject(en, src, lang)
      // eslint-disable-next-line no-console
      console.log(`  + ${lang} created → ${created._id}`)
    }
  }
}

// ============================================================================
// Blog posts
// ============================================================================

// Maps each Sanity English-post slug to the index in lib/i18n.ts's blog.posts
// arrays. The English i18n array has slug fields we could match on directly,
// but the Sanity slug for Microsoft Copilot drops the hyphens around the "s"
// ('microsofts-copilot-...' vs i18n's 'microsoft-s-copilot-...'), so an
// explicit map keeps the matching unambiguous.
const BLOG_TRANSLATION_INDEX: Record<string, number> = {
  'unveiling-the-future-with-wifi-7-ruijie-s-rg-rap73hd-leads-the-charge': 0,
  'microsofts-copilot-the-future-of-productivity-unleashed': 1,
  'infiniband-vs-ethernet': 2,
  'the-evolution-of-cloud-computing-trends-and-predictions-for-the-future': 3,
  'adopting-agility-in-it-daily-life': 4,
  'the-role-of-it-in-ensuring-business-continuity': 5,
}

type TranslatedPost = {
  cat: string
  title: string
  desc: string
  date: string
  read: string
}

type EnglishPostWithBody = TranslatedPost & {
  slug: string
  body: I18nBlock[]
}

type ExistingPost = {
  _id: string
  slug: { current: string }
  thumbnail?: unknown
  author?: unknown
  publishedAt?: string
  language?: string
  seoTitle?: string
}

async function findEnglishPosts(): Promise<ExistingPost[]> {
  return client.fetch<ExistingPost[]>(
    `*[_type == "post" && coalesce(language, "en") == "en"] | order(publishedAt desc){
      _id, slug, thumbnail, author, publishedAt, language, seoTitle
    }`,
  )
}

async function findPostTranslation(slug: string, language: string) {
  return client.fetch<{ _id: string } | null>(
    `*[_type == "post" && slug.current == $slug && language == $language][0]{ _id }`,
    { slug, language },
  )
}

async function ensureEnPostLanguage(doc: ExistingPost) {
  if (doc.language === 'en') return
  await client.patch(doc._id).set({ language: 'en' }).commit()
  // eslint-disable-next-line no-console
  console.log(`  patched ${doc.slug.current} → language:"en"`)
}

async function createTranslatedPost(
  enDoc: ExistingPost,
  enPost: EnglishPostWithBody,
  src: TranslatedPost,
  language: 'ar' | 'tr',
) {
  // English body content is seeded as a placeholder — the i18n catalog only
  // carries the AR/TR list-view metadata, not the full body. Replace this
  // in Studio when the translated body is ready.
  const placeholderBody = blocksToPortableText(enPost.body)

  const doc: { _type: string; [k: string]: unknown } = {
    _type: 'post',
    language,
    title: src.title,
    slug: { _type: 'slug', current: enDoc.slug.current },
    // Reuse the same thumbnail asset reference — the photo is the same
    // regardless of language.
    thumbnail: enDoc.thumbnail,
    excerpt: src.desc,
    // Categories store the translated string; post-client/blog-client's
    // catConfig map covers both English and translated keys so colors +
    // icons resolve correctly.
    category: src.cat,
    readTime: src.read,
    publishedAt: enDoc.publishedAt,
    author: enDoc.author,
    body: placeholderBody,
    seoTitle: `${src.title} | Supportiva`,
    seoDescription: src.desc,
  }
  return client.create(doc)
}

async function seedBlogPosts() {
  const arItems = (translations.ar as unknown as { blog: { posts: TranslatedPost[] } })
    .blog.posts
  const trItems = (translations.tr as unknown as { blog: { posts: TranslatedPost[] } })
    .blog.posts
  const enItems = (translations.en as unknown as { blog: { posts: EnglishPostWithBody[] } })
    .blog.posts

  // eslint-disable-next-line no-console
  console.log(
    `\n=== Blog Posts ===\nSource counts — en: ${enItems.length}, ar: ${arItems.length}, tr: ${trItems.length}`,
  )

  const enDocs = await findEnglishPosts()
  if (enDocs.length === 0) {
    // eslint-disable-next-line no-console
    console.warn('! No English posts found in Sanity. Run `npm run seed` first to skip.')
    return
  }

  for (const en of enDocs) {
    const slug = en.slug.current
    const i = BLOG_TRANSLATION_INDEX[slug]
    if (typeof i !== 'number') {
      // eslint-disable-next-line no-console
      console.log(`\n# ${slug}\n  ! not in BLOG_TRANSLATION_INDEX, skipping`)
      continue
    }

    const enPost = enItems[i]
    if (!enPost) {
      // eslint-disable-next-line no-console
      console.log(`\n# ${slug}\n  ! no English i18n entry at index ${i}, skipping`)
      continue
    }

    // eslint-disable-next-line no-console
    console.log(`\n# ${slug} (i18n index ${i})`)

    await ensureEnPostLanguage(en)

    for (const [lang, items] of [
      ['ar', arItems],
      ['tr', trItems],
    ] as const) {
      const src = items[i]
      if (!src) {
        // eslint-disable-next-line no-console
        console.log(`  ! no ${lang} translation at index ${i}, skipping`)
        continue
      }

      const existing = await findPostTranslation(slug, lang)
      if (existing) {
        // eslint-disable-next-line no-console
        console.log(`  ✓ ${lang} already exists (${existing._id}), skipping`)
        continue
      }

      const created = await createTranslatedPost(en, enPost, src, lang)
      // eslint-disable-next-line no-console
      console.log(`  + ${lang} created → ${created._id}  (body = English placeholder)`)
    }
  }
}

// ============================================================================
// Run
// ============================================================================

async function seedTranslations() {
  await seedProjects()
  await seedBlogPosts()

  // eslint-disable-next-line no-console
  console.log('\nTranslation seed complete.')
  // eslint-disable-next-line no-console
  console.log(
    '\nNext steps:\n' +
      '  1. Visit /ar/projects, /ar/blog, /tr/projects, /tr/blog to verify.\n' +
      '  2. Open each newly created AR/TR blog post in Studio and replace the\n' +
      '     English placeholder body with the translated body.\n' +
      '  3. For NEW posts/projects added later, use the Studio\'s Translations\n' +
      '     panel buttons (Create Arabic / Create Turkish version) instead of\n' +
      '     this script — those create properly linked translations.',
  )
}

seedTranslations().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

export { findEnProject }
