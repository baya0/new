import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

// `.auto('format')` lets Sanity pick the best deliverable format (WebP / AVIF
// for supporting browsers, JPEG otherwise) instead of streaming the raw source
// — critical when source assets are HEIF, which Sanity must transcode on every
// request and which routinely exceeds Next's 7s upstream image timeout.
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format')
}
