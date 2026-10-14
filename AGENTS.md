# AGENTS.md

Rules for agents working in this repository. Keep each rule true even when the values it protects change.

## Architecture

- The Events page shows the live events hub (`https://events.techhubafrica.org`) inside a same-origin iframe at `/events-hub/*`, booted by `src/hubFrame.ts` and fed by the `events-proxy` backend function, because the hub forbids framing and cross-origin reads; the shim strips links to the old main website. `src/data/eventsHub.ts` remains only for other pages' event teasers.
- Ticket prices are normalised in one place (`RATE_OVERRIDE` in `src/data/eventsHub.ts`) so cards, dropdowns and price lines can never disagree.
- Corporate event selection and ascending paid-ticket ordering are applied in the vendored data module so every event view uses the same scope and order.
- The corporate gallery uses the Tech Guru photograph collection; Tech4ALL photography is reached through a new-tab external link so the corporate page and its home link remain available.
- Photographs are uploaded to project asset storage and referenced through `src/assets/*/index.ts` pointer modules; never hotlink to external hosts for imagery the site displays.
- Photo-hero readability is shared through the `photo-hero-*` CSS utilities, with treatments localized to lettering and copy so shared and event heroes do not introduce competing full-image washes.
- Advisory-board records live in `src/data/board.ts` and preserve the official site's governance titles rather than labelling advisers as statutory directors.

## Content

- The events pages must not link to the old main website (`https://techhubafrica.org/`). Keep the events experience entirely in-app.
