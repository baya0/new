/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import Studio from './Studio'

// Sanity Studio is a client-only app — it uses window, IndexedDB, drag-and-
// drop APIs, etc. Render it inside a dedicated "use client" component so
// Next.js never tries to evaluate Studio internals on the server.
export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}
