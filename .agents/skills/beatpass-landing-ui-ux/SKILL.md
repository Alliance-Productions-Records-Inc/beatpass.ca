---
name: beatpass-landing-ui-ux
description: Build, polish, or review beatpass.ca UI and visitor journeys by tracing the BeatPass app's reusable primitives, interaction states, materials, and motion into compatible local components. Use for landing controls, navigation, media, responsive behavior, accessibility, and app handoffs.
---

# BeatPass landing UI and UX

Keep one recognizable BeatPass experience while giving the landing its own job:
a concise introduction and a direct route to listening, plans, or publishing.
Preserve the approved composition when the task is refinement. Shared colors and
a similar screenshot are not sufficient evidence of shared component design.

Read the owner's [UI/UX contract](../../../docs/ui-ux-guidelines.md). For component,
style, or interaction work, read the [app primitive and motion map](references/app-ui-parity.md).
Use [local implementation and release notes](references/landing-contract.md) for
landing owners, destinations, checks, and deployment. The supplied guide remains
the baseline when private source is unavailable; name the evidence gap instead
of claiming source parity or blocking an otherwise supported small correction.

## Trace the source before drawing another control

Name the visitor's task, observed defect, supported state, and next action. For
a changed primitive or cross-product pattern, inspect its app implementation,
style/size helpers, relevant dependencies, and maintained consumers. Compare two
related uses where available. Use GitHub when connected and record the inspected
commit; refresh the map when upstream changes. Do not treat a legacy screen or
the mere existence of a component as proof that its implementation is correct.

Keep three kinds of evidence distinct:

- **App source:** component API, states, tokens, icons, behavior, and lifecycle.
- **Live app:** configured appearance, actual content, composition, motion, and
  runtime behavior. Capture and view Pricing and Producer Program when relevant;
  inspect the anonymous home for journey repetition. Published code can lag live.
- **Landing:** actual local owners, dependencies, and reuse across consumers.

Create a small mapping for affected families: app source and consumer → local
owner → reuse/adaptation decision → state/motion checks → remaining difference.
Names such as `Button`, `IconButton`, `TextField`, `Accordion`, and `SvgIcon`
refer to component contracts, not a request to add matching CSS class names.

## Reuse or adapt at the component boundary

Prefer a compatible existing local primitive. Where an app implementation can be
shared through an authorized, compatible package/export, reuse it. This repo has
no `@common/ui` package or alias: do not add broken imports or pull in the app's
auth, settings, router, translation, player, or kiosk runtime just for styling.

When direct reuse is unavailable, make a reusable local adaptation of the
inspected contract within this repo's component structure. Preserve relevant
variant/color/size roles, semantic elements, ref/event behavior, start/end icon
placement, and hover, focus, active, disabled, pending and error states. Implement
only the roles actually used here. Check dependency and sharing boundaries before
vendoring private application code into the public landing repository; this skill
does not authorize exporting the app. Record adaptations rather than calling a
hand-built lookalike the same component.

Move repeated control styling and interaction into that shared owner; keep page
CSS responsible for composition. Native anchors, buttons, inputs and disclosures
remain valid underlying elements. Using them directly is appropriate for a truly
simple case only when its required app contract is met and the exception is
explained. Do not rebuild each CTA, input, navigation disclosure or FAQ separately.

## Preserve the shared visual and interaction language

- Use Roboto, semantic theme variables, pixel-named spacing, and the configured
  radius roles. `p-12` means 12px at a 16px root. Compare actual settled paint;
  the same variable name can still carry a different runtime color.
- Match the app's icon family for matching roles. Its inspected primitives use
  Material icons through `SvgIcon`; do not substitute Lucide merely because it is
  installed. Keep geometry, optical size, fill/stroke, spacing and focus treatment
  together. A library replacement needs an explicit reason, not a cosmetic guess.
- Reuse the role of the material: neutral frosted navigation chrome, readable
  content surfaces, and artwork-led depth are different jobs. Do not make every
  panel glass or remove established depth in the name of restraint.
- Use one outer frame and clear hierarchy. Retain useful imagery and interaction;
  concise does not mean empty, flat, or motionless. Avoid repeated feature tours,
  rainbow icon plaques, filler badges, and repeated signup pitches.
- Use approved music/brand assets. Static product imagery is not a playable UI.
  Real media previews need authorized content, trusted activation and verified
  playback; never invent tracks, profiles, metrics, progress or earnings.
- Keep commercial details authoritative in the app. Check visible copy, metadata,
  structured data and no-JavaScript fallback together. Route decided visitors to
  discovery, search, plans or the Producer Program, not the anonymous intro again.
  Do not invent cross-origin auth, theme, storage, redirects or audio continuity.

## Make the experience feel responsive and alive

When a brief asks for life, energy, or app parity, inspect the app's actual state
transitions and cinematic/media owners before adding effects. Choose behavior
that serves this composition: immediate action feedback, a responsive disclosure,
appropriate media depth, or a real loading-to-content transition. Use the source
map for applicable families. Restraint is not a blanket ban on purposeful motion,
parallax, progressive blur or artwork-derived color.

Keep motion in reusable owners, with cleanup, appropriate visibility/offscreen
suspension, and reduced-motion behavior. Controls must remain reachable during
transitions; initial content must not depend on animation completing to appear.
Use existing CSS or the installed Framer Motion as appropriate; neither an
additional animation dependency nor an arbitrary duration is implied. Avoid
unrelated section-by-section reveal sequences, hover growth on read-only content,
fake player activity, perpetual decoration, or delays imposed on navigation.

## Verify the component contract, not just the page

Use links for destinations and buttons for actions. Exercise keyboard entry,
activation, focus, Escape/return, disabled/pending/error states where supported,
menu final-item reachability, FAQ expansion/collapse, Back/reload, and actual feed
retry. Native document scrolling, 44px coarse-pointer targets and 16px touch-field
text remain landing requirements even when older app defaults are smaller.

Compare normal motion (`no-preference`) and reduced motion separately. A suite
that forces reduced motion throughout cannot establish the normal experience.
For changed JS motion, test preference changes after mount as well as cold load.
Use a short recording or timed state evidence to show transitions, interruption,
visibility suspension and a still usable reduced-motion path; still screenshots
and a CSS media query alone do not prove lifecycle behavior.

For broad UI work, follow the guide's viewport/theme matrix and compare actual
controls beside their app references at the same appearance, viewport and state.
Check geometry, typography, palette, icon treatment, surfaces, state feedback and
motion. Verify requested viewport versus document width, enlarged text, artwork
and feed failure, and material contrast. Test with Browser when available;
otherwise record the Playwright fallback. Keep QA artifacts outside served source,
intercept analytics test traffic, and never submit live purchases or applications.

Preserve GA4/shared consent and footer preferences; rerun affected consent checks.
Run relevant local checks and report genuine parity gaps. Passing tests, token
reuse, or attractive screenshots alone do not establish component/interaction
parity. Skill-only work needs skill/reference validation, not an unrelated site
build or deployment. Follow session authorization for any subsequent UI release;
this skill adds neither permission nor an extra approval gate.
