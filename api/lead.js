/**
 * Lead relay. Exists so the destination inbox is never in the page source.
 *
 * The form used to POST straight to `formsubmit.co/ajax/<address>`, which meant
 * a real address sat in the HTML of a public site — free for any scraper, and
 * a honeypot in the form does nothing about a bot that skips the page and POSTs
 * to that endpoint directly. Here the address comes from `LEAD_EMAIL` in the
 * environment and never reaches the browser.
 *
 * This runs on Vercel. The GitHub Pages mirror has no functions, so there the
 * fetch 404s and the client swallows it — the mail and WhatsApp buttons are the
 * delivery path on that copy either way.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const buckets = new Map();

/** Best effort only: each serverless instance keeps its own map. */
function allow(key) {
  const now = Date.now();
  if (buckets.size > 500) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= MAX_PER_WINDOW;
}

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (!allow(ip)) return res.status(429).json({ ok: false });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);

  // Same rule the form applies on the client, restated here — a direct POST
  // never ran that check.
  if (!name || !phone) return res.status(400).json({ ok: false });

  const site = process.env.SITE_ORIGIN || 'https://colors-of-haven.vercel.app';
  const to = process.env.LEAD_EMAIL;
  if (!to) {
    console.error('[lead] LEAD_EMAIL is not set — dropping', { name });
    return res.status(500).json({ ok: false });
  }

  const upstream = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // formsubmit refuses a request with no Origin/Referer ("open this page
        // through a web server"). A browser sets them; a serverless fetch does
        // not, so they have to be set by hand or every lead is rejected.
        Origin: site,
        Referer: `${site}/`,
      },
      body: JSON.stringify({
        name,
        phone,
        type: clean(body.type, 80),
        when: clean(body.when, 80),
        _subject: `פנייה חדשה מהאתר · ${name}`,
      }),
    }
  );

  if (!upstream.ok) {
    console.error('[lead] upstream returned', upstream.status);
    return res.status(502).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
