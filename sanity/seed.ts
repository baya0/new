/**
 * Sanity seed script.
 *
 * Reads ALL existing content from `lib/i18n.ts`, transforms it into Sanity
 * documents, and creates them in the configured dataset. Idempotent: skips
 * any document whose slug already exists.
 *
 * Run with:
 *   SANITY_WRITE_TOKEN=<token> npx tsx sanity/seed.ts
 */

import { createClient } from '@sanity/client'
import { translations } from '../lib/i18n'
import { apiVersion, dataset, projectId } from './env'

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  // eslint-disable-next-line no-console
  console.error('Missing SANITY_WRITE_TOKEN environment variable.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Author (single doc)
// ---------------------------------------------------------------------------
const AUTHOR = {
  _type: 'author' as const,
  _id: 'author-osamaabou25',
  name: 'Osama Abou',
  slug: { _type: 'slug', current: 'osamaabou25' },
  role: 'IT Consultant',
  bio: 'IT Consultant at Supportiva, focused on enterprise infrastructure, cloud and migration projects.',
  linkedin: 'https://www.linkedin.com/company/67696474',
}

// ---------------------------------------------------------------------------
// Posts: user-specified slugs / categories / dates / read times.
// Bodies sourced from lib/i18n.ts and converted to Portable Text.
// ---------------------------------------------------------------------------
type PostMeta = {
  title: string
  slug: string
  category: string
  publishedAt: string
  readTime: string
  i18nSlug: string
  excerpt: string
}

const POST_META: PostMeta[] = [
  {
    title: "Unveiling the Future with WiFi 7: Ruijie's RG-RAP73HD Leads the Charge",
    slug: 'unveiling-the-future-with-wifi-7-ruijie-s-rg-rap73hd-leads-the-charge',
    category: 'Network',
    publishedAt: '2024-03-01T00:00:00Z',
    readTime: '2 min read',
    i18nSlug: 'unveiling-the-future-with-wifi-7-ruijie-s-rg-rap73hd-leads-the-charge',
    excerpt:
      "WiFi 7 is here and it's changing the game. Explore how Ruijie's latest access point delivers next-gen wireless performance with an innovative SFP+ port for fiber connectivity.",
  },
  {
    title: "Microsoft's Copilot: The Future of Productivity Unleashed",
    slug: 'microsofts-copilot-the-future-of-productivity-unleashed',
    category: 'Cloud',
    publishedAt: '2024-01-15T00:00:00Z',
    readTime: '2 min read',
    i18nSlug: 'microsoft-s-copilot-the-future-of-productivity-unleashed',
    excerpt:
      "How Microsoft's AI-powered Copilot is transforming the way businesses work — integrated into Word, Excel, Outlook, and Teams.",
  },
  {
    title: 'InfiniBand VS Ethernet',
    slug: 'infiniband-vs-ethernet',
    category: 'Network',
    publishedAt: '2023-12-10T00:00:00Z',
    readTime: '4 min read',
    i18nSlug: 'infiniband-vs-ethernet',
    excerpt:
      'A deep technical comparison of InfiniBand and Ethernet for data center networking — speed, latency, RDMA, and scalability.',
  },
  {
    title: 'The Evolution of Cloud Computing: Trends and Predictions for the Future',
    slug: 'the-evolution-of-cloud-computing-trends-and-predictions-for-the-future',
    category: 'Cloud',
    publishedAt: '2023-12-01T00:00:00Z',
    readTime: '3 min read',
    i18nSlug: 'the-evolution-of-cloud-computing-trends-and-predictions-for-the-future',
    excerpt:
      'From hybrid multi-cloud strategies to serverless computing and AI integration — the key trends shaping the future.',
  },
  {
    title: 'Adopting Agility in IT Daily Life',
    slug: 'adopting-agility-in-it-daily-life',
    category: 'Migration',
    publishedAt: '2023-11-28T00:00:00Z',
    readTime: '3 min read',
    i18nSlug: 'adopting-agility-in-it-daily-life',
    excerpt:
      'A 15-step guide to adopting Agile principles and practices to enhance collaboration, flexibility, and responsiveness in IT teams.',
  },
  {
    title: 'The Role of IT in Ensuring Business Continuity',
    slug: 'the-role-of-it-in-ensuring-business-continuity',
    category: 'Infrastructure',
    publishedAt: '2023-11-21T00:00:00Z',
    readTime: '2 min read',
    i18nSlug: 'the-role-of-it-in-ensuring-business-continuity',
    excerpt:
      'Why a robust IT infrastructure is critical for business continuity — from disaster recovery to remote work enablement.',
  },
]

// ---------------------------------------------------------------------------
// Projects: user-specified order, locations, years, tags, key results.
// Bodies sourced from lib/i18n.ts.
// ---------------------------------------------------------------------------
type ProjectMeta = {
  order: number
  title: string
  slug: string
  i18nTitle: string
  tags: string[]
  location: string
  year: string
}

const PROJECT_META: ProjectMeta[] = [
  {
    order: 1,
    title: 'Nike Turkey Migration Project',
    slug: 'nike-turkey-migration-project',
    i18nTitle: 'Nike Turkey Migration Project',
    tags: ['Migration', '9 Sites', 'Rack & Stack'],
    location: 'Turkey',
    year: '2023',
  },
  {
    order: 2,
    title: 'On Site L1 Support',
    slug: 'on-site-l1-support',
    i18nTitle: 'On Site – L1 Support',
    tags: ['L1 Support', 'Windows 11', '24 months'],
    location: 'Istanbul, Turkey',
    year: '2022 – 2024',
  },
  {
    order: 3,
    title: 'Data Center Cabling Design',
    slug: 'data-center-cabling-design',
    i18nTitle: 'Data Center Cabling Design',
    tags: ['Cabling', 'Datacenter', 'Design'],
    location: 'Client Datacenter',
    year: '2023',
  },
  {
    order: 4,
    title: 'Network Devices Decommissioning Go Green',
    slug: 'network-devices-decommissioning-go-green',
    i18nTitle: 'Network Devices Decommissioning — Go Green',
    tags: ['Go Green', 'Decommissioning', 'E-Waste'],
    location: 'Turkey',
    year: '2023',
  },
  {
    order: 5,
    title: 'Palo Alto PA-440 Firewall Installation',
    slug: 'palo-alto-pa-440-firewall-installation',
    i18nTitle: 'Palo Alto PA-440 Firewall Installation',
    tags: ['Firewall', 'Palo Alto', 'Security'],
    location: 'Client Datacenter',
    year: '2023',
  },
  {
    order: 6,
    title: 'Network Upgrade at MFG Site',
    slug: 'network-upgrade-at-mfg-site',
    i18nTitle: 'Network Upgrade at MFG Site',
    tags: ['Network', 'Cisco', 'WiFi'],
    location: 'Manufacturing Site',
    year: '2023',
  },
  {
    order: 7,
    title: 'Racking and Stacking',
    slug: 'racking-and-stacking',
    i18nTitle: 'Racking & Stacking',
    tags: ['Rack & Stack', 'Datacenter', 'Servers'],
    location: 'Istanbul, Turkey',
    year: '2023',
  },
  {
    order: 8,
    title: 'WiFi Survey',
    slug: 'wifi-survey',
    i18nTitle: 'WiFi Survey',
    tags: ['WiFi', 'Survey', 'Heatmap'],
    location: 'Manufacturing Site',
    year: '2023',
  },
  {
    order: 9,
    title: 'Network Devices Rental',
    slug: 'network-devices-rental',
    i18nTitle: 'Network Devices Rental',
    tags: ['Rental', 'Network', 'Devices'],
    location: 'Client Site',
    year: '2023',
  },
  {
    order: 10,
    title: 'Windows 10 to Windows 11 Migration',
    slug: 'windows-10-to-windows-11-migration',
    i18nTitle: 'Windows 10 to Windows 11 Migration',
    tags: ['Migration', 'Windows 11', 'Devices'],
    location: 'Client Site',
    year: '2023',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function randomKey(): string {
  return Math.random().toString(36).slice(2, 14)
}

type I18nBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

function toPortableText(blocks: I18nBlock[]): unknown[] {
  const out: unknown[] = []
  for (const b of blocks) {
    if (b.type === 'p' || b.type === 'h2') {
      out.push({
        _type: 'block',
        _key: randomKey(),
        style: b.type === 'h2' ? 'h2' : 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: randomKey(), text: b.text, marks: [] },
        ],
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
          children: [
            { _type: 'span', _key: randomKey(), text: item, marks: [] },
          ],
        })
      }
    }
  }
  return out
}

async function slugExists(type: string, slug: string): Promise<boolean> {
  const id = await client.fetch<string | null>(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug },
  )
  return Boolean(id)
}

async function authorExists(slug: string): Promise<boolean> {
  const id = await client.fetch<string | null>(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug },
  )
  return Boolean(id)
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------
async function seed() {
  // eslint-disable-next-line no-console
  console.log(`Seeding project ${projectId} / dataset ${dataset}\n`)

  // Author
  if (await authorExists(AUTHOR.slug.current)) {
    // eslint-disable-next-line no-console
    console.log(`✓ author "${AUTHOR.slug.current}" already exists, skipping`)
  } else {
    const created = await client.createOrReplace(AUTHOR)
    // eslint-disable-next-line no-console
    console.log(`+ author created: ${created._id}`)
  }

  const authorRef = { _type: 'reference', _ref: AUTHOR._id }

  // Posts
  const i18nPosts = (translations.en.blog.posts as unknown) as Array<{
    slug: string
    title: string
    desc: string
    body: I18nBlock[]
  }>

  for (const meta of POST_META) {
    if (await slugExists('post', meta.slug)) {
      // eslint-disable-next-line no-console
      console.log(`✓ post "${meta.slug}" already exists, skipping`)
      continue
    }

    const source = i18nPosts.find((p) => p.slug === meta.i18nSlug)
    if (!source) {
      // eslint-disable-next-line no-console
      console.warn(`! no i18n source body found for "${meta.slug}"`)
      continue
    }

    const doc = {
      _type: 'post',
      title: meta.title,
      slug: { _type: 'slug', current: meta.slug },
      excerpt: meta.excerpt,
      category: meta.category,
      readTime: meta.readTime,
      publishedAt: meta.publishedAt,
      author: authorRef,
      body: toPortableText(source.body),
      seoTitle: `${meta.title} | Supportiva`,
      seoDescription: meta.excerpt,
    }
    const created = await client.create(doc)
    // eslint-disable-next-line no-console
    console.log(`+ post created: ${meta.slug} (${created._id})`)
  }

  // Projects
  const i18nProjects = (translations.en.projects.items as unknown) as Array<{
    title: string
    desc: string
    fullDesc: string
    bullets?: string[]
    icon?: string
    color?: string
    image?: string
    keyResult?: string
  }>

  for (const meta of PROJECT_META) {
    if (await slugExists('project', meta.slug)) {
      // eslint-disable-next-line no-console
      console.log(`✓ project "${meta.slug}" already exists, skipping`)
      continue
    }

    const source = i18nProjects.find((p) => p.title === meta.i18nTitle)
    if (!source) {
      // eslint-disable-next-line no-console
      console.warn(`! no i18n source found for "${meta.title}"`)
      continue
    }

    const doc: { _type: string; [key: string]: unknown } = {
      _type: 'project',
      order: meta.order,
      title: meta.title,
      slug: { _type: 'slug', current: meta.slug },
      icon: source.icon,
      color: source.color,
      desc: source.desc,
      fullDesc: source.fullDesc,
      tags: meta.tags,
      location: meta.location,
      year: meta.year,
      keyResult: source.keyResult,
    }
    if (source.bullets && source.bullets.length) {
      doc.bullets = source.bullets
    }

    const created = await client.create(doc)
    // eslint-disable-next-line no-console
    console.log(`+ project created: ${meta.slug} (${created._id})`)
  }

  // eslint-disable-next-line no-console
  console.log('\nSeed complete.')
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
