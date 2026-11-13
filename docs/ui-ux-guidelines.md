# BeatPass UI and UX guidelines for beatpass.ca

**Version:** 1.0 · **Prepared:** 12 November 2026

**Audience:** designers, developers and coding agents maintaining beatpass.ca.

**Suggested destination:** `docs/ui-ux-guidelines.md` in the landing repository.

This is the standalone, landing-page adaptation of the player app's
`beatpass-ui-ux` skill and maintained design contract. Everything required to
apply it is explained here; access to the private player repository is
unnecessary. Public sources and landing-repository references appear below.

The goal is one recognizable BeatPass experience from introduction to listening,
registration, pricing and the Producer Program. Preserve the brand, musical
identity, theme roles and familiar interaction while composing each page for its
actual purpose. A landing page can have more editorial space and larger display
type than an application workspace. Its controls, surfaces, language and behavior
should still feel related to the player.

This document provides guidance for future work. It does not authorize a redesign,
dependency change, publication or change to product terms. Follow the landing
repository's own task instructions and deployment contract. Preserve any existing
preview or approval boundary without inventing another one.

## 1. Design authority and working method

Use this order when references disagree:

1. Apple Human Interface Guidelines for design principles, adapted with accessible
   browser semantics and WCAG.
2. This BeatPass contract and explicit, current product-owner decisions.
3. The landing site's semantic tokens, theme owners and reusable components.
4. An inspected, maintained BeatPass surface with the same content or interaction.
5. Local page composition and comparable-product references.

Existing code can contain defects. A matching class name, an old prototype or an
attractive screenshot does not establish an approved pattern. Secondary design
systems explain roles; they do not supply another palette, radius ramp or spacing
scale. Apple native APIs, Liquid Glass, system fonts, SF Symbols, toolbar
positions and example spring constants are not universal web requirements.

Before changing a surface:

1. Name the visitor's task, principal content, supported state and next useful
   action. Identify an observed problem: hierarchy, wayfinding, feedback, density,
   overflow, loading, recovery or lost context.
2. Trace the route, page shell, state source and owning components/styles. Inspect
   manifests, available lockfiles and tests. Compare at least two related uses
   where they exist; record a gap rather than inventing a second reference.
3. Describe the applicable principle, smallest useful change and observable
   acceptance condition. Fix a shared owner when its consumers share the defect;
   compose locally when the behavior is unique. Avoid blind utility replacements.
4. Review the actual rendered result and complete the affected interaction,
   including failure and return. Source inspection is evidence of implementation,
   not a completed user journey.

For listening/discovery compositions, inspect Spotify and Apple Music structure
when references would resolve a decision. If UXKIN is available, use
`find_ui_references`, `find_ui_materials` and `get_journey`, opening the actual
screens rather than trusting generated descriptions. Borrow hierarchy and
feedback, retaining BeatPass branding, components and tokens. Record unavailable
tools or irrelevant results; they do not block an otherwise supported repair.

## 2. Shared visual language

### Semantic color and appearance

Read color through semantic roles. Keep theme values in the theme owner; avoid
feature-specific hex colors, isolated accent overrides and decorative palettes.

| Role | Landing utility / variable | Intended use |
| --- | --- | --- |
| Page | `bg-background` / `--be-background` | Main document background |
| Working surface | `bg-paper` / `--be-paper` | Major content regions, forms and readable overlays |
| Subordinate surface | `bg-alt` / `--be-background-alt` | Supporting or read-only grouping |
| Chip surface | `bg-chip` / `--be-background-chip` | Compact metadata with tested foreground contrast |
| Main text | `text-main` / foreground base plus main-text opacity | Content, meaningful labels and values |
| Supporting text | `text-muted` / foreground base plus muted-text opacity | Secondary information that remains readable |
| Boundary | `border-divider` / foreground base plus divider opacity | Separators and intentional region boundaries |
| Emphasis | `primary`, `primary-light`, `primary-dark` / corresponding `--be-*` variables | Main action, selection and meaningful emphasis |
| Text on accent | `text-on-primary` / `--be-on-primary` | Foreground on an accent-filled control |
| Interaction | `hover` and hover/focus/selected opacity variables | Feedback without changing control geometry |
| Semantic status | Existing success, warning and error roles | Actual state, with text or another non-color cue |

RGB variables contain space-separated channels, for example `10 10 10`. Compose
them as `rgb(var(--be-background))` or `rgb(var(--be-primary) / 0.1)`. Do not
assume a comma-separated `rgba()` recipe accepts the same variable format.
Inspect painted output, including gradients, rather than relying on valid-looking
source. A suffix such as `border-divider/50` can replace a token's intended alpha;
check the actual divider against its maintained sibling before changing opacity.

The player has configurable appearance values and an artwork-driven current
accent. The landing site already has its own base themes and image-color owner.
Preserve the distinction between base appearance, configured accent, artwork
color and a genuinely playing track. A hero-derived accent is not evidence of
current playback. Do not add an independent extraction algorithm per section.

These are **landing source values at the inspected revision**, useful for
orientation. They are not a verified export of the player's current production
settings and are not immutable brand colors:

| Base theme variable | Dark | Light |
| --- | --- | --- |
| `--be-background` | `10 10 10` | `252 254 255` |
| `--be-paper` | `15 15 15` | `247 251 255` |
| `--be-background-alt` | `18 18 18` | `240 242 245` |
| `--be-background-chip` | `41 46 54` | `233 236 239` |
| `--be-foreground-base` | `229 231 235` | `15 15 15` |
| Main / muted text opacity | `100%` / `78%` | `87%` / `75%` |
| Hover / selected opacity | `8%` / `16%` | `4%` / `8%` |
| Divider / focus opacity | `12%` / `12%` | `12%` / `12%` |

The CSS startup accent and runtime image-derived accent can differ. Inspect
the settled theme before comparing screens. Keep one owner for base-theme
application, accent updates and logo switching. Verify cold load, theme changes,
failed image/color extraction and final painted light and dark appearances.

### Spacing and page frames

Both repositories use pixel-named spacing converted to rem. At a 16px root:

| Utility | Actual spacing | Common role |
| --- | --- | --- |
| `gap-8` | `0.5rem` / 8px | Closely related controls |
| `gap-12` or `p-12` | `0.75rem` / 12px | Inside a group |
| `gap-16` or `p-16` | `1rem` / 16px | Between major application groups |
| `p-24` | `1.5rem` / 24px | A larger content inset where appropriate |
| `gap-32` | `2rem` / 32px | A larger composition interval |

**`p-12` is not stock Tailwind's 48px.** Prefer the existing
4/8/12/16/20/24/32 rhythm. Hairlines, icon geometry, optical alignment, media
dimensions and comfortable hit targets have valid exceptions. Landing sections
may use larger existing intervals to separate narrative topics; do not compress
a marketing page to dashboard density or copy its spacing into every control.

Let one page/container owner supply the outer gutter. Avoid doubled page padding,
whole-page decorative cards and a different maximum width for every section.
Use spacing, alignment and dividers before adding another nested box. Compare
ordinary and long content together so identity, text and actions keep stable
relationships as they wrap.

### Typography, shape and iconography

Preserve the configured font. The inspected landing source uses Roboto with a
browser-safe fallback stack; its Blade document loads weights 400, 500 and 700.
Do not change the font family as a shortcut to polish. Check the real rendered
weight and loading fallback; declaring an unavailable weight does not prove it
was supplied. Use semantic headings and a clear title/section/body hierarchy.
Application reference roles are a semibold 2xl page title, semibold lg/xl section
titles and sm supporting copy; marketing display headings may be larger when
they reflow well. Actionable and status text must remain at least 12 CSS pixels.

Use `rounded-button`, `rounded-input` and `rounded-panel`. The landing snapshot
sets button/input to `0.5rem` and panel to `0.75rem`. Those are landing values,
not a reason to override configurable player values or substitute fallback
numbers from private components. Keep semantic variables authoritative. An inner
surface should not acquire a larger radius or heavier shadow merely because it
is a separate component.

Circles identify people and compact playback/social actions. Capsules suit
established chips and compact navigation. Media retains its own shape. A long,
wrapping action group may need the panel role instead of corners that clip words.
Use a coherent existing icon family, size and stroke/fill treatment for matching
roles. Center icon-only controls without text-button padding. Decorative icons
are hidden from assistive technology; icon-only actions have meaningful names.
Do not add an icon plaque to every sentence or metric.

### Artwork, materials and motion

Music must retain recognizable musical identity. Use approved brand/product
imagery and real public identity only where its marketing use is authorized.
Do not substitute stock portraits, invented album covers, fake product captures
or fabricated social proof. Clearly label synthetic preview content and keep
stress fixtures separate from normal review images.

In the player, tracks use a shared physical-CD treatment; albums/collections,
producer avatars and external service covers retain their own roles. A landing
preview should preserve these distinctions rather than redesign the same object
as a generic card. Request an approved asset/export if the exact renderer is
unavailable. Do not rebuild the private media renderer from guessed geometry.
Inspect loaded images as well as fallbacks: crop, aspect ratio, resolution,
transparent bounds and visual scale must work at the actual display size.

Purposeful artwork fades and backgrounds can connect content to its surface.
Their final color must meet the destination surface in both themes. Progressive
blur belongs to deliberate overlapping artwork/text compositions; a separate
illustration column should remain crisp. Effects need a content or hierarchy
reason. Simplicity preserves useful color, artwork and depth.

Functional frosted material distinguishes persistent navigation/playback chrome
from content in the player. It is not a default treatment for forms, FAQ answers,
pricing or every card. Player navigation uses neutral clear blur; artwork tint is
scoped to established media roles. Where reproducing that role is appropriate,
verify actual rendered blur, Safari support and readable foreground over
bright and dark content. Use opaque semantic paper for reduced transparency,
increased contrast or unsupported filters. Clear blur alone cannot guarantee
text contrast; record a failed check and resolve the composition rather than
silently declaring it accessible.

Motion should explain activation, selection, reveal or a real state change. Keep
it interruptible, respect reduced motion and avoid delaying frequent actions.
Pause unnecessary offscreen/hidden animation and cancel obsolete async work.
Do not add decorative parallax, particles, glow, a new animation dependency or
admin-video effects merely to make a landing section feel active. Preserve
existing approved cinematic behavior within its task scope and provide a still,
usable reduced-motion alternative. Smooth scrolling also needs that alternative.

## 3. Compose for the visitor's decision

Use purpose, agency, familiarity, flexibility, craft and responsibility together.
A first-time visitor should recognize BeatPass, understand the offer and identify
the next useful action without reading every small label.

| Region | Design decision | Acceptance condition |
| --- | --- | --- |
| Hero | Establish identity and the main value, with one clear primary action and a quieter useful alternative. | Artwork supports readable copy and usable search/actions; decorative content never blocks the task. |
| Artist / producer paths | Explain each audience's relevant next step. | Destinations and labels agree; a producer application is not represented as an ordinary customer purchase. |
| Product explanation | Show supported benefits through meaningful content and approved imagery. | No repeated icon-card inventory, fake product state or claim requiring an unavailable capability. |
| Pricing handoff | Summarize current, verified commercial information and link to its authoritative destination. | Amount, currency, billing interval, eligibility and action agree with the actual offer wherever shown. |
| Blog / video / changelog | Preserve source identity and distinguish loading, empty and failed feeds. | Long titles, missing images and retry work; a failed feed does not masquerade as no content. |
| FAQ | Reduce uncertainty with clear disclosure and useful answers. | Questions are keyboard operable; hidden answers are actually hidden from assistive technology and focus. |
| Footer / final action | Provide useful destinations and one coherent next step. | Links have clear meaning; navigation remains reachable without repeating every earlier explanation. |

Use behavioral principles as decision aids:

- **Fitts:** place actions near their subject; keep comfortable targets and
  separate nearby actions so the wrong one does not fire.
- **Hick and chunking:** group choices by task and disclose secondary detail.
  Five to nine is not a universal card, link or menu limit.
- **Jakob:** preserve familiar navigation, search, disclosure and Back behavior.
- **Feedback:** aim to acknowledge an action within 400ms with actual selection,
  pending or scoped progress. Network completion can take longer; never add
  artificial delay, invented percentages or a false success state.
- **Distinctive emphasis:** reserve strong emphasis for the principal subject,
  action or exception. An equally loud row of buttons has no useful hierarchy.
- **Honest progress:** show only real finite tasks and completion conditions;
  no fake urgency, manufactured streaks or coercive incomplete checklists.
- **Gestalt grouping:** proximity, alignment, similarity and shared regions
  explain relationships. A card around each label is not necessary grouping.
- **Aesthetic usability:** visual polish and successful task completion are
  separate acceptance conditions. Neither proves the other.

Keep benefit copy concise and specific. Verify licensing, payout, subscription,
eligibility and permanence claims with the product owner or current approved
public terms. This guide does not establish any of those terms. Missing data is
not zero; configured rarity is not an unlock rate; a historical award is not a
current reward; a possible benefit is not a guaranteed payout. Public profiles
do not authorize exposing private account data. The current producer model has
one owned artist profile per account; credited artists do not imply a supported
multi-profile switcher.

## 4. Interaction and browser contract

- Use links for destinations and buttons for actions. Preserve modified-click,
  new-tab and context-menu behavior. Commit actions on activation, not
  pointer-down; touch scrolling must not trigger navigation or playback.
- Keep keyboard operation, visible focus and meaningful reading order. A
  navigation disclosure may simply contain links; do not add application-menu
  roles without implementing their complete keyboard behavior.
- Disclosures expose their expanded state and associated content. Overlays need
  an accessible name, appropriate focus containment, Escape/dismissal and focus
  restoration. Nonmodal disclosures should not trap focus. Test the open state,
  final item and return path, not just the closed control.
- Preserve native document scrolling, text selection and browser zoom. Bounded
  overlays and deliberate horizontal media rails may own their own scroll region.
  Keep native desktop document indicators; hiding every scrollbar is not an app
  parity requirement. Set the active `color-scheme` and preserve forced-color
  fallbacks. Any hidden rail indicator needs discoverable, reachable content.
- Native horizontal scrollers retain native touch handling. Apply `pan-y` only
  when a tested custom gesture implementation actually owns horizontal dragging.
  A rail with zero or one item needs no redundant Previous/Next controls.
- Detect capability with media queries such as `pointer` and `hover`, not user
  agent strings or viewport width. Essential actions remain available without
  hover; hover feedback must not move the activation target.
- Coarse-pointer actions have at least **44 × 44 CSS-pixel hit targets**, even
  when the visible icon is smaller. Do not shrink targets to fit branding or a
  crowded row. Touch-editable fields use at least **16 CSS-pixel text**. These
  are BeatPass web choices, not Apple's point sizes or WCAG's universal minimum.
- Label fields beyond their placeholder. Use appropriate input type, input mode
  and autocomplete. Keep errors beside the relevant field and associate them
  accessibly. Preserve drafts and selections on failure; prevent duplicate work
  while pending and offer a relevant retry.
- Distinguish initial loading, refreshing, populated, empty, unavailable and
  failed states. Retain successful content while refreshing where appropriate.
  Expose busy/status information without moving focus or announcing an entire
  result set; do not place a pending announcement inside a region whose busy
  state defers it.
- Reuse existing components before creating another primitive. The landing repo
  cannot import the player's private `@common/ui` layer: maintain local semantic
  equivalents for genuinely shared roles. A raw HTML lookalike does not establish
  parity. Native HTML is a valid implementation when its full behavior fits the
  task; open OS-native pickers during QA rather than judging only field styling.

### The landing-to-player journey

Treat the destination and return as part of the same experience. The inspected
landing source points visitors to these player paths:

| Intent | Existing destination | Verify when changing it |
| --- | --- | --- |
| Explore music | `https://open.beatpass.ca/discover` | A meaningful discovery destination; no unsupported autoplay promise |
| Search | `https://open.beatpass.ca/search/<encoded query>` | Spaces, Unicode, reserved characters, empty input and the supported destination contract |
| Create an account | `https://open.beatpass.ca/register` | Intended next step remains understandable through registration |
| Sign in | `https://open.beatpass.ca/login` | Clear returning-user path |
| Compare plans | `https://open.beatpass.ca/pricing` | Current offer, terms, currency and supported purchase path |
| Join as a producer | `https://open.beatpass.ca/producer-program` | Real application/eligibility journey without invented immediate approval |

These are source-confirmed links, not certification of destination behavior.
Reverify the public contract when modifying a handoff. Keep URL/hash-backed state
where Back/reload should restore it. Test direct entry and card-opened detail
paths where relevant, including returning without unexpectedly reopening a
dialog or losing the filter/search context.

The two domains have separate origins. Do not assume local storage, theme
preferences, authentication or an audio element transfers between them. Do not
invent query parameters, token handoffs or cross-origin synchronization. Report
an observed appearance/state discontinuity and agree a supported integration
when one is required. Source and visual consistency can be maintained without
claiming shared runtime state.

A visible Play button, seeded queue or colored player bar does not prove audio
playback. Any playback claim requires authorized media, trusted user activation,
advancing media time and successful failure/retry handling. Continuous playback
within an app requires the same media element through navigation; it must not
be promised across a full cross-origin page load.

## 5. Responsive and accessible acceptance

Use content/container-aware layouts, safe-area insets and suitable dynamic
viewport units for bounded overlays. Prefer one responsive DOM tree so labels,
state and keyboard behavior do not diverge. Avoid fixed heights that crop wrapped
copy. Use `min-width: 0`, wrapping and intentional stacking where needed; do not
hide horizontal overflow to conceal a broken layout or reduce text to make it fit.

Check 320px and 360px mobile, 768px tablet, 1366 × 768 laptop,
1440 × 900 desktop and 1920 × 1080 wide desktop for broad layout work. Include
landscape and narrow containers where the changed composition needs them. Use
the landing repo's own breakpoints: the player defines some custom breakpoints,
so an identical utility name is not proof of identical behavior.

Verify 200% text enlargement against the actual computed baseline, plus normal
browser zoom. Keep complete words, amounts, dates, status and actions readable.
Test long names, URLs, translated text and both appearances. Translate accessible
names and status messages alongside visible copy when localization is supported;
do not require the player's unavailable translation library. Use expansion
fixtures even when the landing site currently serves one language.

Ordinary text must reach at least 4.5:1 against its rendered background in each
theme. Large text has a WCAG 3:1 exception; do not weaken an existing 4.5:1 target
to exploit it. Necessary control and state boundaries follow applicable non-text
contrast criteria. Status needs more than color, and focus must remain visible
and unobscured. Check actual artwork/material composites, not color swatches.
Support reduced motion, reduced transparency, increased contrast and forced
colors with readable fallbacks. These checks implement the
[WCAG 2.2 accessibility framework](https://www.w3.org/TR/WCAG22/); they are not a
claim that a checklist alone certifies conformance.

For fixed headers, floating actions, feedback and support widgets, review the
combined stack. Individually fitting controls can jointly cover the task. Reserve
measured clearance, keep focused/anchored content visible and allow actions to
enter normal flow when space demands it. Measure overlays after entry motion
settles. A long bounded menu may scroll: prove its final action can be revealed,
hit-tested and reached by keyboard.

## 6. Validation and review checklist

Use synthetic, schema-valid fixtures at the actual feed/query/props boundary.
Do not add production fixture switches, use customer records or submit real
applications, purchases, uploads or messages for visual QA.

For each changed region, check:

- Zero, one, two and many items; ordinary and long content; missing/failed media;
  optional actions and unknown/null values.
- Slow responses, failed loads/saves, retry, retained input and stale results.
  Confirm real state rather than inventing progress to animate.
- Keyboard entry, Tab/Shift+Tab, activation, Escape, focus restoration, native
  scrolling, open menus/accordions and Back/reload.
- Fine/coarse pointer and hover/no-hover combinations, verified with the actual
  emulated media queries; viewport width alone proves no input capability.
- Both settled themes, normal and enlarged text, reduced motion/transparency,
  meaningful image content and loading fallbacks.
- The main action, its real destination and the return journey. For motion work,
  provide a working recording/preview and reduced-motion evidence, not stills alone.

Compare document width and painted content to the **requested CSS viewport**,
not only to `innerWidth`: overflow can enlarge both `innerWidth` and the document
and conceal a failure. Inspect text ink as well as element rectangles. Capture
fixed chrome in a normal viewport before full-page screenshots; full-page capture
can alter layout and is not proof of overlay geometry. Check cold-load rail
position as well as dragged state. Preserve deliberate selections and subsequent
manual browsing when measurements or images settle.

Visual review asks whether the actual content has the right identity, emphasis,
grouping, density, alignment, surface treatment and feedback. Technical review
asks whether the user can finish the task. A tidy accessible page can still need
visual revision; a strong screenshot can still fail its journey.

Run the landing repo's available checks in its approved isolated environment.
At the inspected revision, `package.json` declares only `dev` and `build`;
`npm run build` runs Vite and is not a separate TypeScript check. With existing
dependencies, `./node_modules/.bin/tsc --noEmit` is an explicit type check.
There are no declared lint, unit-test, localization or browser-test scripts and
no dependency lockfiles in that inspected Git tree. Report those gaps; do not
invent script names or copy the player's CI/deployment commands. Use the existing
browser harness if one is available in the maintainer's environment. Add focused
regression coverage for behavior changes; never weaken an assertion to pass.
Treat SSR as a gate only if the landing implementation actually supports it.

For a broad audit, keep a coverage ledger:

| Route / region | Task and state | Observed problem / principle | Change | Visual evidence | Interaction evidence | Gaps / deliberate exceptions |
| --- | --- | --- | --- | --- | --- | --- |
| Record each inspected surface | Include entry, destination and return | Separate observation from hypothesis | Name the owner | Theme, viewport, normal/stress fixture | Actual steps and outcome | Source-only, untested device or unavailable state |

Provide rendered phone/desktop images in both themes with normal approved
content, then separate stress evidence. Wait for theme and entry transitions to
settle. If the owner requested an image, provide an image; a link to an HTML
gallery is not equivalent. Verify review links work. Record visual approval,
interaction evidence and release readiness separately. Browser emulation cannot
certify a physical phone keyboard, safe areas, native gestures or screen-reader
behavior; name hardware/assistive-technology checks that remain.

Before release, report changed files, exact commands/results, failed/skipped
gates, coverage, product/data impact and remaining risks. Preserve a verified
previous release and use the landing maintainer's rollback procedure. Monitor
the changed public routes, asset loads, runtime errors and primary destinations
after authorized activation. A green build is not production readiness. This
guide does not import the player's Laravel cache/FPM or guarded-build authority
into the separate landing repository.

## 7. Landing repository map and known verification gaps

Reviewed through GitHub at revision
[`5fac3760b039010755e4c7d8e7617e021b441ecd`](https://github.com/Alliance-Productions-Records-Inc/beatpass.ca/tree/5fac3760b039010755e4c7d8e7617e021b441ecd),
12 November 2026. This was source inspection, not a rendered-site audit.

| Concern | Existing landing owner |
| --- | --- |
| Laravel routes and Blade document | `routes/web.php`, `resources/views/app.blade.php` |
| React entry and page composition | `resources/js/app.tsx`, `resources/js/components/landing/LandingPage.tsx` |
| Hero, branding, search and account navigation | `resources/js/components/landing/Hero.tsx` |
| Artist and producer destinations | `resources/js/components/landing/ChooseYourPath.tsx` |
| Appearance and logo application | `resources/js/contexts/ThemeContext.tsx`, `resources/js/hooks/useTheme.ts` |
| Dynamic accent and image-color handling | `resources/js/utils/colorExtraction.ts` |
| Semantic utilities and pixel-based spacing | `tailwind.config.js` |
| Base theme, font, buttons and shared surface styles | `resources/css/app.css` |
| Disclosure and external content | `FAQ.tsx`, `RecentVideos.tsx`, `FromTheBlog.tsx` in the landing component directory; `resources/js/components/Changelog.tsx` |
| Declared stack and checks | `package.json`, `composer.json`, `tsconfig.json`, `vite.config.ts` |

The inspected manifests describe React 18/TypeScript, Tailwind 3, Vite 4,
Framer Motion, Lucide and Laravel 9. These are repository declarations, not
verification of installed versions. Keep existing architecture; this handoff
does not recommend a framework migration or private-component dependency.

Some existing source should **not** be copied as the shared standard:

- `app.css` hides all scrollbars globally. The current player contract preserves
  native document/desktop indicators, with scoped rail/touch exceptions.
- Some hero status labels use `text-[10px]`. Actionable/status text has a 12px
  floor in the shared contract.
- The mobile account trigger is `w-42 h-42`, and small button styles can be below
  44px. Verify actual coarse-pointer hit targets, including surrounding CSS.
- The root uses `overflow-x-hidden`. A clipped document is not reflow evidence.
- Hero parallax and global smooth scrolling require an exercised reduced-motion
  path; the existence of an animation library does not supply one automatically.
- The FAQ uses an opacity/max-height reveal. Verify content association and
  hidden-answer accessibility, not just its visible appearance.

These are source observations and QA priorities, not a completed defect audit,
automatic redesign scope or a claim that the existing site has been repaired.
Visual parity with the currently configured player, cross-domain preference
behavior, destination flows and physical-device behavior remain to be verified.
The player's 20 October 2026 acquisition redesign was rolled back; its saved
proposal is historical research, not permission to redesign beatpass.ca or adopt
its pricing/Producer Program composition. Preserve subsequent explicit approvals.

## 8. Sources, adoption and maintenance

This export was prepared from the player's working-copy UI/UX skill and maintained
frontend design system, Apple/web sourcebook, behavioral principles, anti-slop
review criteria, content-led visual quality, owner review standard, mobile
listening/materials guidance, visual craft and testing/coverage contracts.
Private relative links and application-only implementation instructions have been
replaced with the explanations and landing equivalents above. Detailed producer
dashboard, achievements, payments and request-composer rules apply only when
those real product workflows are in scope; their transferable requirements here
are truthful state, recognizable media, authorized public identity and complete
entry/action/return validation.

Public references:

- [Apple HIG layout](https://developer.apple.com/design/human-interface-guidelines/layout)
  and [accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility):
  hierarchy, adaptable content and inclusive interaction. Their official Markdown
  content was read for this export; native implementation details are adapted.
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines):
  consult the relevant buttons, typography, color, materials, motion, navigation,
  loading or disclosure guidance when changing that pattern.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): browser accessibility authority.
  BeatPass's 44px coarse-pointer target is a product choice; WCAG 2.2 AA's target
  criterion specifies 24 CSS pixels with exceptions.
- [Landing tokens](https://github.com/Alliance-Productions-Records-Inc/beatpass.ca/blob/5fac3760b039010755e4c7d8e7617e021b441ecd/tailwind.config.js),
  [shared CSS](https://github.com/Alliance-Productions-Records-Inc/beatpass.ca/blob/5fac3760b039010755e4c7d8e7617e021b441ecd/resources/css/app.css)
  and [base themes](https://github.com/Alliance-Productions-Records-Inc/beatpass.ca/blob/5fac3760b039010755e4c7d8e7617e021b441ecd/resources/js/hooks/useTheme.ts):
  inspected landing implementation, subject to the known gaps above.

To adopt this file, place it at the suggested destination and reference it from
the landing repository's contributor or agent instructions. For example, after
placing the file, add this paragraph through that repository's normal process:

> For UI/UX changes, read `docs/ui-ux-guidelines.md`. Preserve BeatPass semantic
> tokens, brand/media identity and accessible browser behavior. Validate the
> rendered page, affected destination and return journey. Record failed/skipped
> checks and follow this repository's deployment and rollback rules.

Keep this a versioned export. When the player changes approved brand assets,
fonts, theme roles, shared control behavior or a public handoff route, its owner
should send an updated guide and approved visual reference captures to the
landing maintainer. Record the date, affected rules and acceptance evidence.
The landing maintainer should map those changes to local owners and compare
both products at the same viewport and appearance. Preserve unresolved source
or hardware gaps explicitly; private code access is not a prerequisite for
following this document.
