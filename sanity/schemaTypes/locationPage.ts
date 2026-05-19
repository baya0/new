import { defineField, defineType } from 'sanity'
import { isUniquePerLanguage } from './isUnique'
import { LOCATION_KEY_OPTIONS, SERVICE_KEY_OPTIONS } from './serviceKeys'

export const locationPage = defineType({
  name: 'locationPage',
  title: 'Location Page',
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
      description: 'Full title including service and city, e.g. "Managed IT Services in Dubai".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description:
        'Internal slug. The public URL is built from serviceKey + locationKey, not this field, but a slug is still required for Studio listing.',
      type: 'slug',
      options: { source: 'title', isUnique: isUniquePerLanguage },
      readOnly: ({ document }) =>
        typeof document?.language === 'string' && document.language !== 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceKey',
      title: 'Service Key',
      description: 'Service this location page targets. Must match an existing servicePage.serviceKey.',
      type: 'string',
      options: { list: SERVICE_KEY_OPTIONS as unknown as Array<{ title: string; value: string }> },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationKey',
      title: 'Location Key',
      description: 'Machine key for the city. Used as the route segment.',
      type: 'string',
      options: { list: LOCATION_KEY_OPTIONS as unknown as Array<{ title: string; value: string }> },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationName',
      title: 'Location Display Name',
      description: 'City name as shown to users, e.g. "Dubai" or "دبي".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline (H1)',
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
      name: 'localCaseStudySlug',
      title: 'Local Case Study Slug',
      description: 'Optional slug of a Sanity project in this city to feature.',
      type: 'string',
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
    select: { title: 'title', subtitle: 'locationName', media: 'ogImage' },
  },
})
