import type { Template } from 'sanity'

// Initial-value templates per (schemaType, language). The Structure Builder
// sublists reference these so that when an editor clicks "Create new" inside
// `Blog Posts → Arabic`, the resulting doc is pre-stamped with language: "ar".
// Without these, new docs land with `language` undefined and silently fall
// into the English bucket via `coalesce(language, "en")`.

export const LOCALIZED_SCHEMA_TYPES = [
  'post',
  'project',
  'author',
  'servicePage',
  'locationPage',
] as const
export type LocalizedSchemaType = (typeof LOCALIZED_SCHEMA_TYPES)[number]

export const STUDIO_LANGUAGES = [
  { id: 'en', title: '🇬🇧 English' },
  { id: 'ar', title: '🇸🇦 Arabic' },
  { id: 'tr', title: '🇹🇷 Turkish' },
] as const
export type StudioLanguage = (typeof STUDIO_LANGUAGES)[number]

const SCHEMA_TITLES: Record<LocalizedSchemaType, string> = {
  post: 'Blog Post',
  project: 'Project',
  author: 'Author',
  servicePage: 'Service Page',
  locationPage: 'Location Page',
}

export function templateId(schemaType: LocalizedSchemaType, languageId: string): string {
  return `${schemaType}-${languageId}`
}

export const localizedInitialValueTemplates: Template[] = LOCALIZED_SCHEMA_TYPES.flatMap(
  (schemaType) =>
    STUDIO_LANGUAGES.map<Template>((lang) => ({
      id: templateId(schemaType, lang.id),
      title: `${SCHEMA_TITLES[schemaType]} (${lang.title})`,
      schemaType,
      value: { language: lang.id },
    })),
)
