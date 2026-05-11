import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  service?: string;
};

const TO_ADDRESS = "info@supportiva.net";
const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS ?? "Supportiva Website <onboarding@resend.dev>";

// ── Rate limiting ─────────────────────────────────────────────────────────
// In-memory token bucket per client IP. Survives only as long as the serverless
// instance is warm — good enough to block scripted abuse and runaway spam
// without an external service. Upgrade to Upstash Redis if the site moves to
// multi-region / high traffic.
const RATE_LIMIT_MAX = 5; // requests
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // per hour
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  // Vercel and most proxies forward the real IP here. Take the first hop.
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  entry.count += 1;
  return { allowed: true };
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: limit.retryAfter
          ? { "Retry-After": String(limit.retryAfter) }
          : undefined,
      },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const message = body.message?.trim();
  const service = body.service?.trim();

  if (!name || !email || !company || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "All fields (name, email, company, message) are required.",
      },
      { status: 400 },
    );
  }

  // Bound input lengths so the API can't be abused as an open relay for
  // megabyte-sized payloads, and so Resend never sees garbage data.
  if (
    name.length > 120 ||
    email.length > 200 ||
    company.length > 200 ||
    message.length > 5000 ||
    (service?.length ?? 0) > 200
  ) {
    return NextResponse.json(
      { ok: false, error: "One or more fields exceed the maximum length." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New contact request from ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    service ? `Service: ${service}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px;">New contact request</h2>
      <p><strong>Name:</strong> ${escape(name)}</p>
      <p><strong>Email:</strong> ${escape(email)}</p>
      <p><strong>Company:</strong> ${escape(company)}</p>
      ${service ? `<p><strong>Service:</strong> ${escape(service)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escape(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message ?? "Failed to send email." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected error sending email.";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
