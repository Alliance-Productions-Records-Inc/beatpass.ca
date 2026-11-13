# App primitives, materials and motion

## Current evidence

Reinspected 13 November 2026 through GitHub at
[`084a829190cdecf829713742a66354c005ddb103`](https://github.com/alliancewav/open.beatpass.ca/tree/084a829190cdecf829713742a66354c005ddb103).
This supersedes the October source snapshot used in the first redesign. Compare
live configured surfaces as well: public theme values and footer menu icon trees
come from the live app, not package defaults. Pricing, Producer Program, discovery,
search autocomplete, track and artist pages are the maintained visual references.

The previous implementation passed functional checks but used bright custom
boundaries, approximate icon geometry and repeated photographic tile treatments.
Do not interpret functional checks or shared token names as visual approval.

## Shared owners and local adoption

| Family | App source under the pinned tree | Local owner / decision |
| --- | --- | --- |
| Icons | `common/resources/client/icons/{svg-icon,create-svg-icon}.tsx`, `icons/material/*`, `icons/social/*` | `components/icons/*` reuses the actual selected modules and geometry. No handwritten feature icon map. Vite dev guard is the only helper adaptation. |
| Buttons | `common/resources/client/ui/buttons/{button,button-base,get-shared-button-style,button-size}.tsx` | `components/ui/Button.tsx` adapts native anchor/button roles, states and sizing. Neutral outlines use `--be-divider-opacity`, not independent bright opacity. Fine-pointer md/sm heights 42/36px; coarse targets at least 44px. |
| Consent surface | `common/resources/client/ui/cookie-notice/{cookie-notice.tsx,cookie-notice.css}` | `components/ConsentNotice.tsx`: 480px maximum, 12px floating inset, paper, 16px padding, 14/20px copy, equal Refuse/Accept, Cancel on stored preferences. Keep landing `utils/analytics.ts` cookie/configuration behavior. No player inset or sidebar context here. |
| Footer | `common/resources/client/ui/footer/{footer.tsx,footer.css}` | `landing/Footer.tsx`: logo/social top row, configured icon chip menu, copyright and outline controls. Same social set and public menu destinations/icon trees in `config/footer-menu.json`; shared on changelog. Landing is English-only; language control offers an explicit app handoff, without pretending other landing translations or cross-origin locale mutation exist. |
| Navigation glass | `common/resources/client/common.css`, `.be-frosted-chrome` | Transparent neutral chrome with 40px (`backdrop-blur-2xl`) blur, divider boundary, opaque fallback for reduced transparency/increased contrast or unsupported filters. Keep artwork tint out of navigation. |
| Cinematic background | `web-player/layout/{cinematic-background-layers.tsx,cinematic-background.css,use-parallax-scroll.ts}` | `landing/CinematicBackground.tsx`, `utils/parallax.ts`: approved studio photo, paper/alt overlay roles, saturation and progressive 2/4/8/12px masked blur. Document scrolling and runtime preference handling replace player/kiosk infrastructure. |
| Disclosure | `common/resources/client/ui/{marketing/marketing-faq,accordion/accordion}.tsx` | `ui/Accordion.tsx`: single-open outline disclosure, 200ms height/opacity, hidden/inert closed panels, keyboard focus movement. `useReducedMotionPreference` follows runtime changes; Framer 10's built-in hook only snapshots at mount. |
| Realtime search | `web-player/search/{search-autocomplete.tsx,requests/use-search-results.ts}`, `Search/SearchController.php` | `landing/CatalogSearch.tsx` and landing `CatalogSearchController.php`: actual anonymous catalog results, 300ms debounce, cancellation/stale protection, keyboard combobox, auto placement, empty/error/retry. Fixed HTTPS upstream and loader, bounded input/results, no credentials forwarded or private playback/auth runtime. Public profile/email results are omitted. |
| Native channel rail | `web-player/channels/{channel-content-carousel,channel-carousel-viewport}.tsx` | `ui/ChannelCarouselViewport.tsx` reuses the app viewport; `ui/ChannelCarousel.tsx` adapts heading/actions, observer-driven bounds and scroll controls without license/filter/player providers. Journal shows up to 12 feed articles. Audience paths become a mobile rail. No autoplay/clones. |
| Edge fade | `web-player/pricing/sections/landing-rail-edge-fade.{ts,css}`, `playable-item/content-grid.css` | `utils/rail-edge-fade.ts` reuses exact geometry/cosine alpha mask. Responsive maximum 60/80/100/120px. Only cropped fragments/gaps fade; complete cards stay readable; masking is disabled while content has focus. |

Paths beginning `web-player/` above are under `resources/client`; common paths are
under `common/resources/client`. Local JS paths are under `resources/js`.
The app's source contains multiple carousel generations. Prefer the native channel
viewport for editorial/discovery rails; do not import old Glide autoplay merely
because its file also says carousel.

## Composition and media

Keep roles distinct. Hero depth and audience decisions can use immersive photo
backgrounds; journal cards use larger crisp 4:3 images with compact text below, in the shared
channel rail. The community uses the live Discord illustration across the viewport, its official
white full-lockup logo, and neutral Discord/YouTube actions. Four masked blur
layers progressively soften the artwork behind readable media-ink copy. On phones
the actions have equal full widths. Reduced transparency/increased contrast and
unsupported filters provide an opaque copy surface. Avoid repeating the same overlay tile
for unrelated sections.

Use a distinct source image for every section; a recrop is still a repeated photo.
The live hero uses configured studio image `08b92485-3c64-4fe5-be80-d42068af9587.webp`.
Artist/producer choices use the **rendered** Pricing/Program studio scenes ending
`b8bf8db4-c840-46d5-a159-d3ae179c1002-1000.webp` and
`b8bf8db4-c840-46d5-a159-d3ae179c1003-1000.webp`, under
`storage/homepage/studio-scenes/2026-11`. Community uses the live illustrated
Discord `3011208942255ebea25fdacf4030810caab076f16f12b7fb31d48d591e38730b-community-banner.png`,
under `storage/homepage/brand-assets/discord/2026-11`.
Do not use `public/images/landing/landing-header-bg.jpg` or `landing-footer-bg.jpg`:
those are inactive legacy stock assets, not current frontend references. Confirm
actual image consumers in settled browser DOM before selecting from a repository.

Likewise, configured theme values are not settled paint. The current app home
applies neutral artwork accents: dark primary 148/148/148, primary-light 180 and
on-primary black; light primary 102, primary-dark 82, on-primary white. Pricing
and Program keep the configured blue-gray primary. The landing uses the live
home palette through its semantic theme owner; do not introduce a second palette
in feature CSS or claim a stored configuration proves rendered parity.

Journal images/text/dates remain
actual RSS data. No fake player, tracks, metrics or account state.

Search chips must point to real app routes. The current genre set was verified in
its public genre listing. Tags were checked through `api/v1/tags/<name>/tracks`:
trap 63, piano 53, dark 33, melodic 13, drill 8, soulful 6 tracks on 13 November.
These are an observed curated sample, not a global trending claim. Refresh when
changing chips; do not invent labels or expose counts as permanent marketing copy.

## Required verification

Compare app/landing at the same viewport, theme and state: boundaries, neutral
materials, typography, icon paths, button sizes, notice geometry and footer menu.
Exercise actual destinations and Back. Check both normal/reduced motion, cold and
runtime changes, interrupted FAQ transitions and carousel scrolling. For rails,
verify first/middle/last, partial-card fades, focus removes masks, resize, touch,
keyboard and final-item reachability. Keep document scrolling native.

Test anonymous realtime search against the real API and synthetic failure/race
fixtures: debounce, cancellation, latest query, result selection, submit, Escape,
clear, retry, and popup bounds with the visual viewport. A fixture-only test does
not prove the public endpoint works. Isolate HTTP tests before providers boot so
rate-limit/session caches never write production state. A numeric throttle can
invoke an auth guard in Laravel; use the landing's named IP-only limiter.

Keep artifacts outside served source. Browser emulation cannot certify physical
keyboards, screen readers or safe-area behavior. Intercept GA collection in QA.
Preserve shared consent behavior and rerun accept/refuse/withdrawal checks after
notice changes. This reference neither imports app release procedures nor adds
an approval gate beyond the user's existing authorization.

## Mobile polish — 13 November 2026

`Header.tsx` adapts the app navbar's compact Menu/IconButton and shared neutral
surface into a nonmodal navigation disclosure. Unlike the app's account/runtime
portal menu, it owns just the landing destinations. Entry/exit uses an interruptible
220ms height/opacity transition; the close glyph gives immediate feedback. Escape
returns focus, outside touch and focus departure dismiss, closed links are inert,
and short viewports scroll to the last action. Runtime reduced motion removes
these transitions; the header does not lock document scrolling or trap focus.

`ui/ChipRail.tsx` (footer only) adapts `common/resources/client/ui/navigation/scrollable-chip-nav.tsx`
from the pinned revision: native horizontal scrolling, 24px alpha edge masks,
ResizeObserver bounds, and keyboard focus reveal. It omits app selection/translation
and optional mouse dragging. Footer retains the app's icon-chip rail with balanced settings below. Touch targets
are 44px. Focus removes masks so focused labels/outlines stay fully visible.

Journal keeps the app channel viewport and crop-aware edge fades. The larger 4:3
artwork carries the color; no tinted photo wash or audience-card title overlays.
On phones excerpts yield to complete titles, dates and article links. Article
content and dates remain source RSS data, with no invented categories or counts.

Hero suggestions deliberately do **not** use the chip rail or fade masks. The owner
rejected both clipped labels and oversized visible pills. `SearchSuggestions.tsx`
wraps complete 28px visual capsules inside separate 44px touch targets. Four genres
and three tags are visible initially on phones; More tags discloses the remaining
three in place, with an associated expanded state and no horizontal scrolling.
All suggestions remain visible on desktop. Footer capsules similarly separate
32px visible faces from their 44px hit areas. Never apply a touch min-height and
background to the same pill face when it bloats the visual density.
