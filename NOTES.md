# Colors of Haven — imported from Claude Design

Source: https://claude.ai/design/p/5046ef22-96fa-4768-b4ab-4620161aeaf1 ("Colors of Heven Design System")

## What's here
Everything is real, final content — no placeholders. Full asset set pulled from `Colors of Heven Design System.zip` (~/Downloads), then web-optimized. Total project size: ~11MB (raw export would have been ~40MB+).

- `templates/hero/Hero.dc.html` — the full home page template (hero clouds + scroll-scrubbed video, services, project rail, "how it works" 3D paint-bucket drop, Leaflet service-area map, testimonials, contact form). Self-booting: `support.js` loads React/ReactDOM/Leaflet/three.js from CDN at runtime, so you can open this file directly in a browser with no build step.
- `templates/hero/support.js` — the dc-runtime that parses `<x-dc>` + the trailing `<script data-dc-script>` and mounts it as React.
- `assets/a11y/a11y.js` — the accessibility widget.
- `assets/frames/*.jpg` — all 16 images, recompressed (JPEG quality 65–78, matched to each photo's detail level). The 10 that came back truncated via the design-sync tool (256KB/file cap) were re-sourced from the full zip export and properly compressed — originals were 700KB–2.7MB each with near-lossless quality; now 55KB–500KB with no visible quality loss.
- `assets/video/journey.mp4` — the real hero video, transcoded with macOS `avconvert` (Preset640x480, actual output 640×356) from the 20.8MB source down to 4.15MB. Visually solid at full-bleed hero scale; a straight quality/size compromise in favor of load time.
- `assets/models/paint-bucket.glb` — the real 3D paint-bucket model (4.2MB, used as-is — this is the one the project's own `paint-bucket-instructions.md` describes building via Meshy/Tripo3D, so left untouched). Loaded async via a dynamic `three.js` import, non-blocking.

## What changed from the original design-system export
- **Video**: real footage, recompressed 5x smaller (20.8MB → 4.15MB). Scroll-scrub logic untouched.
- **Gallery + area photos**: real photos, recompressed roughly 10x smaller on average. Same markup/captions.
- **Removed one truly dead weight**: the Google Fonts request no longer pulls the `DynaPuff` weight — it wasn't referenced by any `font-family` in the template.
- **Kept the Leaflet map and the three.js bucket animation** — both intentional, real content once wired to their real assets, not weight worth cutting.

## Mobile experience (added later, separate design)
`Hero.dc.html` now renders one of two completely separate experiences from a single component, switched by `state.isMobile` (`matchMedia('(max-width:767px)')`, re-evaluated on resize):

- **Desktop** (`<sc-if value="{{ isDesktop }}">`): unchanged — the scroll-scrubbed video hero, Leaflet map, continuously scroll-linked bucket animation.
- **Mobile** (`<sc-if value="{{ isMobile }}">`): a from-scratch mobile design imported from a separate Claude Design project ("תצוגת טלפון חדשה", project `e8a1d391-6f2e-4b04-8538-58adb6af971d`, file `Mobile Preview.dc.html`) that was itself previewed there inside iOS/Android device-frame mockups (`ios-frame.jsx`/`android-frame.jsx` — design-tool-only, not used on the live site). Adapted for real deployment (removed the artificial phone-frame scroll container, wired to natural page scroll instead):
  - Sticky header (call icon, wordmark, hamburger) instead of the floating pill nav.
  - Autoplaying/looping hero video instead of scroll-scrub — much simpler, no blob-prefetch needed.
  - Tap-to-reveal service cards (`state.mActiveSvc`) instead of hover.
  - "How it works" bucket animation plays **once**, triggered by `IntersectionObserver` when scrolled into view, instead of continuous scroll-linking. Same three.js/GLTFLoader code path as desktop, same retry-on-failure hardening.
  - Project gallery: native `overflow-x:auto` + `scroll-snap` instead of the JS transform-driven rail.
  - Areas: photo crossfade + chips (`state.mActiveArea`) — no Leaflet on mobile.
  - Contact form: reuses the desktop's exact `mailBtnRef`/`waBtnRef`/`onMailClick`/`onWhatsapp` handlers (same smart, form-data-populated mailto/WhatsApp links), just a simpler 3-field layout (drops the "when" field).
  - Menu sheet and WhatsApp FAB: reuse the desktop's exact DOM refs (`sheetRef`, `waRef`) and CSS — same polished slide-in animation, just conditionally mounted in the mobile tree instead.

**Known fixed bug**: the mobile bucket's `IntersectionObserver` could get set up twice (once from `componentDidMount`, once from `componentDidUpdate` reacting to a `isMobile` flip shortly after mount), causing two competing `WebGLRenderer` instances on the same canvas and a blank/unsized bucket. Fixed with a guard in `mSetupBucketRetry` (skip if `this.mBucketIO` already exists) and a re-entrancy flag (`mBucketStarted`) at the top of `mPlayBucket`.

## Preview
Open `templates/hero/Hero.dc.html` in a browser (or serve the `colors-of-haven` folder with any static server) to see it live. Resize below 767px width to see the mobile experience.
