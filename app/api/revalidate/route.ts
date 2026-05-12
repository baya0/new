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
 * Setup in Sanity dashboard:
 *   1. API → Webhooks → Create webhook
 *   2. URL: https://<your-domain>/api/revalidate
 *   3. Dataset: production
 *   4. Trigger on: Create, Update, Delete
 *   5. Filter (optional): _type in ["post", "project", "author"]
 *   6. HTTP method: POST
 *   7. HTTP Headers: x-webhook-secret = <a long random string>
 *   8. Projection:
 *        { "_type": _type, "slug": slug.current }
 *
 * Put the same random string in Vercel as SANITY_REVALIDATE_SECRET.
 */

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

type WebhookBody = {
  _type?: string;
  slug?: string;
};

export async function POST(request: NextRequest) {
  // Require a shared secret in the header so random POSTs can't trigger
  // revalidations and waste serverless invocations.
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
    // No body is fine — we'll just revalidate the index pages.
  }

  const revalidated: string[] = [];

  // Always refresh the listing pages and the sitemap.
  for (const path of ["/blog", "/projects", "/sitemap.xml"]) {
    revalidatePath(path);
    revalidated.push(path);
  }

  // Refresh the specific document's detail page if we know its type + slug.
  if (body.slug) {
    if (body._type === "post") {
      revalidatePath(`/post/${body.slug}`);
      revalidated.push(`/post/${body.slug}`);
    } else if (body._type === "author") {
      revalidatePath(`/profile/${body.slug}`);
      revalidated.push(`/profile/${body.slug}`);
    }
  }

  return NextResponse.json({ ok: true, revalidated });
}
