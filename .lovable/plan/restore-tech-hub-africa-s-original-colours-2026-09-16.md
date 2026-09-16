# Restore Tech Hub Africa’s Original Colours

## Goal
Replace the current deep green and cream palette across the website with the two uploaded brand swatches:
- Brand mint: `#C4F2DD`
- Brand white: `#FFFFFF`

## Changes
- Update the shared colour system so every page, navigation area, footer, ticker, card, form, loader, and event section inherits the uploaded colours.
- Convert green backgrounds to brand mint and cream surfaces to pure white.
- Keep headings, body text, buttons, and controls readable by using a dark neutral ink wherever mint can no longer provide enough contrast.
- Replace remaining page-specific green and cream values in overlays, shadows, gradients, and decorative effects with neutral or mint equivalents.
- Preserve the existing amber accent, photography, layout, typography, and interactions.
- Check the homepage and key subpages at desktop and mobile widths for contrast, visual consistency, and overflow.

## Technical details
- Centralize the new values in the existing semantic colour tokens.
- Separate foreground text roles from background brand roles where the old shared green token currently serves both purposes.
- Remove residual hardcoded forest/cream HSL values from presentation code.
