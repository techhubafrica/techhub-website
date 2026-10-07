# AGENTS.md

Rules for agents working in this repository. Keep each rule true even when the values it protects change.

## Architecture

- Event content is vendored into `src/data/eventsHub.ts` from the events hub feed (`https://events.techhubafrica.org/api/events/list?filter=all`) rather than fetched at runtime, because that feed sends no `Access-Control-Allow-Origin` header and the browser cannot read it from another origin. Refresh the file by hand when events change; never switch the page to an iframe of the events site, which sets `x-frame-options: SAMEORIGIN`.
- Ticket prices are normalised in one place (`RATE_OVERRIDE` in `src/data/eventsHub.ts`) so cards, dropdowns and price lines can never disagree.
- Photographs are uploaded to project asset storage and referenced through `src/assets/*/index.ts` pointer modules; never hotlink to external hosts for imagery the site displays.

## Content

- The events pages must not link to the old main website (`https://techhubafrica.org/`). Keep the events experience entirely in-app.
