import type { Metadata, Viewport } from 'next'

import Studio from './Studio'

// Sanity Studio is a client-only app — it uses window, IndexedDB, drag-and-
// drop APIs, etc. We render it inside a "use client" component (Studio.tsx)
// so Next.js never evaluates Studio internals on the server.
//
// We also define metadata/viewport locally rather than re-exporting from
// `next-sanity/studio`, because that import has top-level code that
// references `window` and throws during SSR.

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default function StudioPage() {
  return <Studio />
}
