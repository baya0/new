/**
 * One-time translation seed.
 *
 * Reads the Arabic and Turkish project translations you already wrote in
 * `lib/i18n.ts` (translations.ar.projects.items / translations.tr.projects.items)
 * and creates matching Sanity documents with `language: "ar"` / `language: "tr"`.
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
 * AR/TR as linked siblings of the English doc. For projects seeded by this
 * script, edit each language's document directly from the doc list. For
 * NEW projects you add in the future, use the studio's "Create Arabic
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

type Translated = {
  title: string
  desc: string
  fullDesc?: string
  bullets?: string[]
  tags?: readonly string[]
  location?: string
  keyResult?: string
}

function randomKey(): string {
  return Math.random().toString(36).slice(2, 14)
}

function toPortableText(text: string | undefined) {
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
        {
          _type: 'span',
          _key: randomKey(),
          text: para,
          marks: [],
        },
      ],
    }))
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

async function findTranslation(slug: string, language: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug && language == $language][0]{ _id }`,
    { slug, language },
  )
}

async function ensureEnLanguage(doc: ExistingProject) {
  if (doc.language === 'en') return
  await client.patch(doc._id).set({ language: 'en' }).commit()
  // eslint-disable-next-line no-console
  console.log(`  patched ${doc.slug.current} → language:"en"`)
}

async function createTranslatedProject(
  enDoc: ExistingProject,
  src: Translated,
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
    // Re-use the same image asset references from the English doc — the
    // photo is the same regardless of language.
    image: enDoc.image,
    images: enDoc.images,
    description: src.desc,
    fullDescription: toPortableText(src.fullDesc),
    bullets: src.bullets ?? [],
    tags: src.tags ? [...src.tags] : enDoc.tags ?? [],
    location: src.location ?? enDoc.location,
    year: enDoc.year,
    keyResult: src.keyResult ?? enDoc.keyResult,
  }
  return client.create(doc)
}

async function seedTranslations() {
  const arItems = (translations.ar as unknown as { projects: { items: Translated[] } })
    .projects.items
  const trItems = (translations.tr as unknown as { projects: { items: Translated[] } })
    .projects.items
  const enItems = (translations.en as unknown as { projects: { items: Translated[] } })
    .projects.items

  // eslint-disable-next-line no-console
  console.log(
    `Source counts — en: ${enItems.length}, ar: ${arItems.length}, tr: ${trItems.length}\n`,
  )

  // Get every English project in Sanity, in display order. The seed script
  // creates one project per item in enItems; AR/TR translations are matched
  // by position (item[i] in en corresponds to item[i] in ar/tr).
  const enDocs = await client.fetch<ExistingProject[]>(
    `*[_type == "project" && coalesce(language, "en") == "en"] | order(order asc){
      _id, order, slug, icon, color, image, images, tags, year, keyResult, location, language
    }`,
  )

  if (enDocs.length === 0) {
    // eslint-disable-next-line no-console
    console.error('No English projects found in Sanity. Run `npm run seed` first.')
    process.exit(1)
  }

  // Match each English Sanity doc to its position in the i18n array by title.
  // (Order numbers in PROJECT_META mirror the i18n array, so order-1 is the
  // i18n index for the matching project.)
  for (const en of enDocs) {
    const i = (en.order ?? 0) - 1
    if (i < 0) continue
    const slug = en.slug.current

    // eslint-disable-next-line no-console
    console.log(`\n# ${slug} (order ${en.order})`)

    await ensureEnLanguage(en)

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

      const existing = await findTranslation(slug, lang)
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

  // eslint-disable-next-line no-console
  console.log('\nTranslation seed complete.')
  // eslint-disable-next-line no-console
  console.log(
    '\nNext: visit /projects with the language switcher to verify, or open the\n' +
      'studio doc list filtered by language to edit. For NEW projects you add\n' +
      'later, use the studio\'s Translations panel buttons instead of this script.',
  )
}

// Quick sanity check: also exit with non-zero on any thrown error.
seedTranslations().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

// findEnProject is exported for potential future per-slug use.
export { findEnProject }
