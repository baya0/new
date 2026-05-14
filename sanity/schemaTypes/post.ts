import { defineField, defineType } from 'sanity'
import { isUniquePerLanguage } from './isUnique'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
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
        'Auto-generated from the English title. Translated copies inherit the same slug and cannot change it — the public site looks posts up by slug, so changing it on Arabic or Turkish would break the URL.',
      type: 'slug',
      options: { source: 'title', isUnique: isUniquePerLanguage },
      readOnly: ({ document }) =>
        typeof document?.language === 'string' && document.language !== 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short description shown on the blog listing page',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud', value: 'Cloud' },
          { title: 'Network', value: 'Network' },
          { title: 'Security', value: 'Security' },
          { title: 'Migration', value: 'Migration' },
          { title: 'Infrastructure', value: 'Infrastructure' },
          { title: 'Sustainability', value: 'Sustainability' },
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      description: 'e.g. 3 min read',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'Overrides the title for search engines if needed',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Shown in Google search results — keep under 160 characters',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})
