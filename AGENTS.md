# beatpass.ca contributor instructions

This repository owns the public landing and changelog. Keep work scoped here;
the web app is a separate application and deployment.

For UI/UX changes, use `.agents/skills/beatpass-landing-ui-ux/SKILL.md` and read
`docs/ui-ux-guidelines.md`. Preserve BeatPass semantic tokens, approved branding,
media identity, browser accessibility, and the existing GA4 consent setup. Validate
the rendered page, affected destination and return journey. Inspect the live app
for visual parity; unpublished app changes may not be reflected on GitHub.

Keep this landing a concise gateway. Send visitors directly to discovery, plans,
search or the Producer Program rather than repeating the app's anonymous landing
page. Product terms and commercial details remain authoritative in the app.

Use the installed stack and commands in `package.json`. For broad frontend work,
run tests, explicit TypeScript checking, the build, and browser verification.
Keep screenshots, stress fixtures, temporary scripts and reports outside served
source. Do not use real customer records or submit purchases/applications in QA.

For authorized releases, follow the local skill's asset/manifest deployment and
rollback notes. Building under `/tmp` alone is not a deployment. Never run a Vite
dev server that writes `public/hot` in this served workspace. Do not import the
player's cache, FPM, database or release procedures into this repository.
