import type { StructureBuilder, StructureResolver } from 'sanity/structure'

const LOCALIZED_TYPES = [
  { name: 'post',    title: 'Blog Posts' },
  { name: 'project', title: 'Projects' },
  { name: 'author',  title: 'Authors' },
] as const

const LANGUAGES = [
  { id: 'en', title: '🇬🇧 English' },
  { id: 'ar', title: '🇸🇦 Arabic' },
  { id: 'tr', title: '🇹🇷 Turkish' },
] as const

// One sublist per (type, language). Editors land on a list that already
// filters by language, so they don't have to scan a wall of 3× documents.
function localizedSublist(S: StructureBuilder, typeName: string, languageId: string) {
  return S.documentList()
    .title(LANGUAGES.find((l) => l.id === languageId)?.title ?? languageId)
    .schemaType(typeName)
    .filter('_type == $type && coalesce(language, "en") == $language')
    .params({ type: typeName, language: languageId })
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...LOCALIZED_TYPES.map(({ name, title }) =>
        S.listItem()
          .title(title)
          .child(
            S.list()
              .title(title)
              .items(
                LANGUAGES.map((lang) =>
                  S.listItem()
                    .id(`${name}-${lang.id}`)
                    .title(lang.title)
                    .child(localizedSublist(S, name, lang.id)),
                ),
              ),
          ),
      ),
    ])
