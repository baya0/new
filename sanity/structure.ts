import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { apiVersion } from './env'
import {
  LOCALIZED_SCHEMA_TYPES,
  STUDIO_LANGUAGES,
  templateId,
  type LocalizedSchemaType,
} from './schemaTypes/initialValueTemplates'

const TYPE_TITLES: Record<LocalizedSchemaType, string> = {
  post: 'Blog Posts',
  project: 'Projects',
  author: 'Authors',
  servicePage: 'Service Pages',
  locationPage: 'Location Pages',
}

// One sublist per (type, language). Editors land on a list that already
// filters by language, so they don't have to scan a wall of 3× documents.
// `coalesce(language, "en")` so legacy docs (no language field set) appear
// in the English sublist — matches what the public site shows.
//
// Each sublist binds the matching initial-value template so "Create new"
// from inside `Blog Posts → Arabic` produces a doc pre-stamped with
// `language: "ar"`. Without this the language field (readOnly + hidden)
// stays undefined and the new doc silently lands in the English bucket.
function localizedSublist(
  S: StructureBuilder,
  typeName: LocalizedSchemaType,
  languageId: string,
) {
  return S.documentList()
    .title(STUDIO_LANGUAGES.find((l) => l.id === languageId)?.title ?? languageId)
    .schemaType(typeName)
    .apiVersion(apiVersion)
    .filter('_type == $type && coalesce(language, "en") == $language')
    .params({ type: typeName, language: languageId })
    .initialValueTemplates([
      S.initialValueTemplateItem(templateId(typeName, languageId)),
    ])
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      LOCALIZED_SCHEMA_TYPES.map((typeName) =>
        S.listItem()
          .title(TYPE_TITLES[typeName])
          .child(
            S.list()
              .title(TYPE_TITLES[typeName])
              .items(
                STUDIO_LANGUAGES.map((lang) =>
                  S.listItem()
                    .id(`${typeName}-${lang.id}`)
                    .title(lang.title)
                    .child(localizedSublist(S, typeName, lang.id)),
                ),
              ),
          ),
      ),
    )
