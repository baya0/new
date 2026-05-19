import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

/**
 * Sanity webhook receiver.
 *
 * Sanity is configured to POST here whenever a document is published or
 * deleted. We use that signal to refresh the cached pages so editors see
 * their changes on the live site within seconds rather than waiting for the
 * hourly ISR revalidation.
 *
 * Setup in Sanity dashboard (manage.sanity.io → API → Webhooks):
 *   1. URL: https://<your-domain>/api/revalidate
 *   2. Dataset: production
 *   3. Trigger on: Create, Update, Delete
 *   4. Filter: _type in ["post", "project", "author"]
 *   5. HTTP method: POST
 *   6. HTTP Headers: x-webhook-secret = <a long random string>
 *   7. Projection: { "_type": _type, "slug": slug.current }
 *
 * Put the same random string in Vercel as SANITY_REVALIDATE_SECRET.
 *
 * Why the routes look like "/[lang]/blog": revalidatePath's second
 * argument is "page" | "layout". When you pass a dynamic route shape
 * (e.g. "/[lang]/blog") with "page", Next.js invalidates every concrete
 * path that matches that shape — /en/blog, /ar/blog, /tr/blog — in one
 * call. Calling revalidatePath("/blog") wouldn't match anything on this
 * site since every page lives under /[lang]/.
 */

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

type WebhookBody = {
  _type?: string;
  slug?: string;
};

export async function POST(request: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { ok: false, error: "Revalidation is not configured." },
      { status: 500 },
    );
  }
  const presented = request.headers.get("x-webhook-secret");
  if (presented !== SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret." }, { status: 401 });
  }

  let body: WebhookBody = {};
  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    // No body is fine — we'll still flush the index pages.
  }

  const revalidated: string[] = [];
  const flush = (route: string, type: "page" | "layout" = "page") => {
    revalidatePath(route, type);
    revalidated.push(route);
  };

  // Sitemap is a single concrete route — no locale segment.
  revalidatePath("/sitemap.xml");
  revalidated.push("/sitemap.xml");

  if (body._type === "post") {
    flush("/[lang]/blog");
    if (body.slug) flush(`/[lang]/post/${body.slug}`);
  } else if (body._type === "project") {
    flush("/[lang]/projects");
    if (body.slug) flush(`/[lang]/projects/${body.slug}`);
  } else if (body._type === "author") {
    if (body.slug) flush(`/[lang]/profile/${body.slug}`);
    // Author name/avatar shows on blog cards too.
    flush("/[lang]/blog");
  } else {
    // Unknown or missing _type — be conservative and flush both listings.
    flush("/[lang]/blog");
    flush("/[lang]/projects");
  }

  return NextResponse.json({ ok: true, type: body._type ?? null, slug: body.slug ?? null, revalidated });
}
