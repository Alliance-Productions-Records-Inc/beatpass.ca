# Local landing contract

## Authority and purpose

The product owner's full shared contract is `docs/ui-ux-guidelines.md`. Its
November 2026 source inventory describes an earlier tree. Inspect current files
and manifests rather than treating the inventory or historical test gaps as
immutable. Update the export when the owner supplies a changed shared standard;
do not silently change product terms while editing this local skill.

The landing is an introduction and gateway. Detailed acquisition, pricing,
license information and producer onboarding belong to the web app. The app's
anonymous home is a second complete introduction, so it is not the default
outbound destination. Keep useful public journal/community content on this site.

## Shared-component adoption

Read [app primitive and motion mapping](app-ui-parity.md) when changing a shared
control, material or interaction. The local owner table below identifies existing
files. The November 13 redesign implements reusable local adapters under
`resources/js/components/ui`: Button/IconButton, Accordion and the app channel viewport.
These preserve the inspected roles without importing private app infrastructure.
The cookie notice matches the app surface while retaining the landing consent behavior.
See the parity map for implemented roles and remaining differences.

For a livelier surface, trace the app's cinematic, disclosure and state-transition
owners and validate both normal and reduced motion. Preserve approved composition
and real media semantics; don't restore the old repetitive feature tour as a
substitute for component/interaction parity.

## Owners

| Concern | Local owner |
| --- | --- |
| Routes, metadata, JSON-LD and no-JS fallback | `routes/web.php`, `resources/views/app.blade.php` |
| React startup and GA initialization | `resources/js/app.tsx` |
| Landing composition | `resources/js/components/landing/LandingPage.tsx` |
| Header and navigation / hero and search | `Header.tsx`, `Hero.tsx` |
| Shared brand assets | `resources/js/components/landing/Brand.tsx` |
| Destination and search encoding contract | `resources/js/utils/navigation.ts` |
| Artist / producer handoffs | `resources/js/components/landing/AudiencePaths.tsx` |
| Journal content and retry | `Journal.tsx`, `resources/js/hooks/useRssFeed.ts` |
| FAQ and its matching structured data | `resources/js/components/landing/FAQ.tsx` |
| Community and footer | `Community.tsx`, `Footer.tsx` |
| Theme base / logos | `useTheme.ts`, `ThemeContext.tsx` |
| Shared controls and icons | `resources/js/components/ui/*`, `resources/js/components/icons/*` |
| Search and genuine catalog chips | `landing/CatalogSearch.tsx`, `config/search-chips.ts`, `CatalogSearchController.php` |
| Channel rails / app edge fades | `ui/ChannelCarousel.tsx`, `ui/ChannelCarouselViewport.tsx`, `utils/rail-edge-fade.ts` |
| Cinematic image / scroll lifecycle | `CinematicBackground.tsx`, `config/landing.ts`, `utils/parallax.ts` |
| Runtime motion preference | `resources/js/hooks/useReducedMotionPreference.ts` |
| Shared semantic tokens and spacing | `tailwind.config.js`, `resources/css/app.css` |
| Shared cookie / GA4 / notice | `utils/analytics.ts`, `components/ConsentNotice.tsx` |

Component names in the landing directory are relative to
`resources/js/components/landing`; theme and hook files live in their named
`resources/js/contexts`, `hooks`, and `utils` directories. Unused feature tours and their styling have been removed. Keep the composition
focused instead of restoring those repetitive sections.

## Public handoffs

Use `APP_URLS` and `searchDestination` instead of reproducing URL strings.

| Intent | Destination |
| --- | --- |
| Listening | `https://open.beatpass.ca/discover` |
| Plans and licensing | `https://open.beatpass.ca/pricing` |
| Publishing information and application path | `https://open.beatpass.ca/producer-program` |
| Free account | `https://open.beatpass.ca/register` |
| Returning user | `https://open.beatpass.ca/login` |
| Search | `/search/<encodeURIComponent(trimmed query)>` on `open.beatpass.ca` |

Empty/whitespace search goes to discovery. Preserve Unicode and reserved
characters as a single encoded path segment. Reverify live route behavior when
changing this contract. Producer signup is not a guarantee of approval.

## Privacy invariant

GA4 ID is `G-5K99X60DF6`; all four Consent Mode defaults are denied before tag
loading. Respect stored `bp_consent` on `.beatpass.ca`, `/`, `SameSite=Lax`, with
six-month expiry. No GA cookies before acceptance; withdrawal clears GA cookies
and reloads. Privacy preferences must remain reachable. All initial/route
pageviews carry `content_group=landing`; don't duplicate pageviews or add tags.
Consent state is intentionally shared by a domain cookie. This does not imply
shared local storage, authentication or appearance between origins.

A live cross-domain check on 12 November 2026 found that the app still displayed
its own consent notice with `bp_consent=denied` present on `.beatpass.ca`. The
landing cookie is available to the app; banner suppression must be verified and
aligned by the app owner. Do not claim that cookie scope alone proves the
other app consumes it, and do not add an invented cookie/local-storage bridge.

## Checks and release

The project uses React 18, TypeScript, Tailwind 3, Vite 4 and Laravel 9. Use the
installed versions. Current commands are `npm test`,
`npm run typecheck`, `php -l resources/views/app.blade.php`, and
`npm run build -- --outDir <isolated-stage> --emptyOutDir`. Browser-check both
landing and changelog when shared styling changes. Keep browser measurements
out of GA dashboards by intercepting test collection requests.

The served workspace uses `public/build/manifest.json`. A build only under
`/tmp` does not deploy it. After session-authorized activation, verify the public
HTML references the new manifest files and the downloaded asset hashes match.
Preserve the old manifest and referenced assets outside the served tree, copy
new hashed assets first, and atomically replace the manifest last. Retain older
hashed files for cached pages; do not wipe `public/build` in place. Rollback is
an atomic restore of the verified previous manifest while its assets remain.
No player database, FPM, queue, Laravel-cache or guarded-build commands are
imported into this separate repository. Don't start a dev server that writes
`public/hot` in the served workspace.

Browser QA should include normal desktop/mobile in both themes, broad-width
reflow, keyboard and coarse-pointer behavior, 200% text enlargement, empty and
failed feed states with retry, media failures, direct destination/return, shared
consent and the privacy notice. Report what was actually observed and what was
not exercised. Emulation does not certify physical devices or screen readers.
