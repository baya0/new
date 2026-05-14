import type { SlugIsUniqueValidator } from 'sanity'

// Default Sanity slug validation rejects any (type, slug) collision. With
// document-level i18n we WANT collisions across languages — the English doc
// at /<slug> and the Arabic doc at /ar/<slug> must share the same slug so
// the GROQ lookups in `app/[lang]/post/[slug]/page.tsx` resolve. This helper
// scopes uniqueness to (type, slug, language): two docs can share a slug
// iff they're in different languages.
//
// Wired into post/project/author schemas via the slug field's
// `options.isUnique`. Sanity calls this when an editor edits the slug or
// hits Publish; without it, the Studio shows "Slug is already in use".
export const isUniquePerLanguage: SlugIsUniqueValidator = (slug, context) => {
  const { document, getClient } = context
  if (!document || !document._type) return true

  const client = getClient({ apiVersion: '2024-01-01' })
  const id = (document._id ?? '').replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    type: document._type,
    slug,
    // Legacy docs (created before the i18n plugin) may have no language
    // field; treat those as English so they collide with the right peers.
    language: (document.language as string | undefined) ?? 'en',
  }
  return client.fetch(
    `!defined(*[
      !(_id in [$draft, $published]) &&
      _type == $type &&
      slug.current == $slug &&
      coalesce(language, "en") == $language
    ][0]._id)`,
    params,
  )
}
