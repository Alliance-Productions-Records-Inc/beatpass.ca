# BEATPASS™

Landing page for [BEATPASS™](https://beatpass.ca) — the official beat library and music licensing web app by Alliance Productions Records Inc.

**Landing page:** [beatpass.ca](https://beatpass.ca)
**Web app:** [open.beatpass.ca](https://open.beatpass.ca)

## About

BEATPASS™ is a beat streaming and licensing platform that connects producers with artists. This repository contains the source code for the landing page at [beatpass.ca](https://beatpass.ca), which introduces the platform and directs users to the web app at [open.beatpass.ca](https://open.beatpass.ca).

## Landing design and visitor journeys

For UI/UX work, use `.agents/skills/beatpass-landing-ui-ux/SKILL.md` and the
owner-supplied `docs/ui-ux-guidelines.md`, referenced by `AGENTS.md`. The skill
maps the shared app standards to this repository's components, theme, checks,
and asset/manifest deployment procedure.

The landing introduces BeatPass and sends visitors directly to discovery,
search, plans, or the Producer Program. The web app owns its own anonymous
introduction and detailed commercial information. Keep pricing and application
terms there rather than repeating another full tour here. Live app screenshots
are the visual reference when published repository source lags deployment.

The landing uses approved existing product artwork and live public journal RSS
content. Generated design concepts are review references, not shipped product
screenshots. Article images/dates/titles remain sourced from the feed. The cinematic studio background follows document scrolling and becomes static for
reduced motion. FAQs use an accessible animated accordion; feed failures have a real retry.
The journal contains up to 12 real posts in a native channel carousel. Its crisp
image-plus-text cards stay distinct from the immersive audience choices, which
also become a carousel on mobile. Both rails reuse the app’s adaptive edge mask.
Hero suggestions wrap without masks or clipping: compact visible capsules retain
44px hit areas, and More tags reveals the remaining mobile suggestions. The
mobile navigation is a bounded, animated nonmodal disclosure with reduced-motion
support. Community uses the live Discord banner across the viewport, its official
wordmark, progressive blur behind copy, and neutral destination buttons.

## Fast iteration

The mounted page has one composition owner, `LandingPage.tsx`, and focused sections
under `resources/js/components/landing`. `components/ui` owns Button/IconButton,
Accordion, ChipRail for footer navigation, and the native channel carousel. `components/icons` reuses the app’s
actual Material/social modules; its README records provenance. Reuse those controls;
page CSS owns layout. The adapters follow the inspected app contracts without
importing its player/auth shell. The skill's parity map records the differences.

`config/landing.ts` owns the approved studio image and responsive sources.
`CinematicBackground.tsx` owns rendering; `utils/parallax.ts` owns the passive
scroll listener, frame scheduling, fade, suspension and cleanup.
`useReducedMotionPreference.ts` also follows preference changes after mount.
Theme tokens and logos are owned by `useTheme.ts` and `ThemeContext.tsx`.
The landing palette follows settled app-home paint (including its neutral artwork
accent), and selected studio/community images are verified live consumers.
Unused repository stock images and stored theme values are not visual references.

Unmounted feature tours, old YouTube feed UI, duplicated layout styles, the unused
color-extraction/CDN path and Lucide dependency have been removed. Public server
feed routes and existing public brand assets are retained for compatibility.

Use `npm test`, `npm run typecheck`, and a staged production build:
`npm run build -- --outDir /tmp/beatpass-build --emptyOutDir`. Do not start Vite
in this served workspace: it writes `public/hot`. Browser checks can substitute
staged hashed assets into live HTML through request interception. Keep fixtures,
screenshots and recordings under `/tmp`; intercept GA collection requests.
Follow the skill's manifest-last activation and rollback procedure for releases.

## Public catalog search

`CatalogSearch.tsx` provides the app-style combobox with real results after a
300ms pause, cancellation of superseded requests, keyboard selection and a
viewport-aware popup. `CatalogSearchController.php` calls only the fixed public
app search endpoint over verified HTTPS. It forwards no visitor credentials,
returns bounded display fields/app links, caches anonymous results for 30 seconds
and uses a named IP-only rate limiter. Search errors remain recoverable; submitting
still goes straight to app search. `config/search-chips.ts` contains verified
public genres and a curated sample of dense tags, with provenance in the skill.

The footer reuses the app layout, social icons and public configured menu. The
landing remains English-only; its language control links explicitly to the app's
language choices rather than claiming translations exist on this origin.

## Landing analytics and consent

The landing app uses only GA4 measurement ID `G-5K99X60DF6` (the shared BeatPass
property). `resources/js/utils/analytics.ts` initializes all four Consent Mode
fields as denied before loading `gtag.js`. Without acceptance, GA4 runs in
advanced consent mode with cookie-less measurements. A stored `granted` choice
is applied before configuration and the first pageview.

The notice uses the app’s compact floating paper surface, with equally styled
Refuse and Accept buttons, the existing privacy-policy URL and Cancel when reopening a saved choice. Privacy preferences in the
landing and changelog footers reopen it. Choices are stored in `bp_consent` as
`granted` or `denied`, with `Domain=.beatpass.ca`, `Path=/`, `SameSite=Lax`, and an
expiry six calendar months ahead (`Secure` on HTTPS). This domain cookie is
shared with other BeatPass subdomains; those applications must continue honoring
the same cookie. A live app check on 12 November 2026 showed its notice still
appearing with the shared denied cookie present; that app-side consumption needs
alignment in the separate app repository. Withdrawal updates consent to denied, expires visible GA
cookies at host/domain and current path scopes, and reloads to discard the tag's
in-memory identifiers. Missing or denied consent also clears stale GA cookies.

Every initial and client-side pageview includes `content_group: 'landing'`.
History `pushState`, `replaceState`, and back/forward navigation are covered;
same-URL changes and section anchors do not generate additional pageviews.

**GA4 stream setting:** This app sends pageviews manually and sets
`send_page_view: false`. In the web stream for `G-5K99X60DF6`, also disable
Enhanced Measurement → Page views → Advanced settings → **Page changes based on
browser history events**, to avoid duplicate route pageviews. This setting lives
in GA4 and is not changed by this repository. Coordinate the setting with the
other sites using this stream. See [Google's manual-pageview documentation](https://developers.google.com/analytics/devguides/collection/ga4/views).

Run `npm test` for consent, navigation, public search and motion regression checks, `npm run typecheck`
for type checking, and `npm run build` for the production build. The regression
tests use a simulated browser environment; verify the real Google tag in a fresh
browser profile on a BeatPass hostname before release:

- Before choosing: notice visible, all four defaults denied, no `_ga` cookies.
- Accept: shared `bp_consent=granted`, all four fields granted, full collection.
- Reload or visit another participating subdomain: saved choice respected and no second notice.
- Privacy preferences → Refuse: shared `bp_consent=denied`, GA cookies removed,
  page reloads, and consent stays denied after reload.
- Fresh refusal: saved denied choice, no GA cookies, and no banner on reload.
- Navigate with the History API and back/forward: one pageview per route with
  `content_group=landing` (with GA4 automatic history pageviews disabled).

## License

All Rights Reserved. This source code is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited. See [LICENSE](LICENSE) for details.

## Custom Web Design & Development

Interested in a website like this for your brand? Alliance Productions offers custom web design and development services for artists, labels, and creative businesses.

**Services include:**

- Custom website design & development
- Brand identity & UI/UX design
- E-commerce & booking systems
- Hosting & maintenance

**Contact us:** [contact@allianceproductions.ca](mailto:contact@allianceproductions.ca)

&copy; Alliance Productions Records Inc. All rights reserved.
