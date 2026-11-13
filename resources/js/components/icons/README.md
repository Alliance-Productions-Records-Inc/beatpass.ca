# BeatPass shared icon subset

These are the app's Material and social icon modules, not redrawn landing icons.
Source: `alliancewav/open.beatpass.ca`, commit
`084a829190cdecf829713742a66354c005ddb103`, under
`common/resources/client/icons` (13 November 2026).

The selected icon modules and their path/viewBox data are reused unchanged.
`svg-icon.tsx` is the shared primitive. `create-svg-icon.tsx` uses Vite's
`import.meta.env.DEV` instead of the app's `process.env.NODE_ENV` guard.
`clsx` is the same helper used upstream. Theme/size classes live in `app.css`.

Import named icons from `material/*` or `social/*`. Do not add a hand-drawn path
map in a feature. Refresh from the connected repository at a recorded commit.
The footer also uses the app's public configured icon trees through the shared
`createSvgIconFromTree` API; `config/footer-menu.json` records that menu snapshot.
