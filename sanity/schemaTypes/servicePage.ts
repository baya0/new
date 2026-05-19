import { defineField, defineType } from 'sanity'
import { isUniquePerLanguage } from './isUnique'
import { SERVICE_KEY_OPTIONS } from './serviceKeys'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description:
        'Should match serviceKey for clean URLs (e.g. /services/managed-it-services). Translated copies inherit the English slug and cannot change it.',
      type: 'slug',
      options: { source: 'title', isUnique: isUniquePerLanguage },
      readOnly: ({ document }) =>
        typeof document?.language === 'string' && document.language !== 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceKey',
      title: 'Service Key',
      description:
        'Machine identifier matching the route slug. Must stay consistent across translated copies of the same service.',
      type: 'string',
      options: { list: SERVICE_KEY_OPTIONS as unknown as Array<{ title: string; value: string }> },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (H1)',
      description: 'Keyword-rich H1 shown at the top of the page.',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'keyBenefits',
      title: 'Key Benefits',
      description: 'Bullet points rendered in the Key Benefits section.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'targetIndustries',
      title: 'Target Industries',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedProjectSlugs',
      title: 'Related Project Slugs',
      description:
        'Slugs of project documents to feature as case studies. Resolved at request time so updates to those projects flow through.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string' }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'serviceKey', media: 'ogImage' },
  },
})
