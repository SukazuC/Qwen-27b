# Architecture Decisions

## Potassium Amount — CONFIRMED 150 mg

Reference screenshots showed conflicting values for potassium per tablet:
- Mobile panel: 200 mg
- Desktop panel & comparison table: 150 mg

**Decision:** Use **150 mg** as canonical value in `src/lib/content/ingredients.ts`.

**Status:** ✅ **Confirmed 150 mg** by product team.

## Design References vs Production Assets

- Design reference screenshots (from mobile/PC screenshots) are copied to `docs/design-reference/` only.
- They are NOT used as production images.
- All production visuals come from `public/assets/source/` with normalized filenames.
- All readable text is real HTML text, not embedded in images.

**Design references copied:**
- Mobile-section-1.png
- Mobile-section-2-3.png
- Mobile-section-4-5.png
- Mobile-section-6.png
- PC-section-1.png
- PC-section-2-3.png
- pc-section-4-5.png
- PC-section-6.png

## Client/Server Component Boundaries

Server Components by default:
- layout, page, footer, static section shells

Client Components only where needed:
- `MobileMenu` — stateful drawer with focus trap
- `WaitlistForm` — form submission
- `ElectrolyteTempleSection` — ingredient selector state
- `ComparisonArenaSection` — tab state (composition/prix toggle)
- `Countdown` — client-side timer
- `FounderVoteCard` — vote interaction

## Asset Normalization

All filenames converted to kebab-case:
- No spaces, no plus signs, no special characters
- Example: `hero-product-scene+background.png` → `hero-product-scene-background.png`
- Script: `scripts/prepare-assets.ts`

**Production assets in `public/assets/source/`:**
- hero-product-scene-background.png
- flavor-passion-scene.png
- flavor-berry-scene.png
- flavor-next-scene.png
- electrolyte-temple.png
- electrolyte-temple-background.png
- comparison-arena-scene.png
- hydratis-packshot.png
- decathlon-packshot.png
- dragon-mark-gold.png
- founder-passport.png
- hydre-wordmark.png
- statue-bust-checker.png (CTA decorative statue)
- berry-can-white.png (additional product asset)

## Database Strategy

- Supabase-hosted Postgres for production
- Drizzle ORM for type-safe queries
- API routes gracefully degrade when DATABASE_URL is missing
- Static pages build without a live database
- Demo mode returns mock data when DB unavailable

## Health Claims Compliance

All ingredient benefits marked with `legalReview: true` in content data.
See `docs/claims-review.md` for full compliance review notes.

## Remaining TODOs

1. **Legal review** of all claims/comparison values before launch
2. **Verify competitor comparison values** against current public product data
