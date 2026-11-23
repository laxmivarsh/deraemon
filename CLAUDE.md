# Doraemon Universe - Developer Guide

## Architecture Overview
- `src/app`: Next.js App Router pages and dynamic routes.
- `src/components`: UI components organized by feature (hero, 3D, layout, games, search).
- `src/data`: Canonical seed data for characters, gadgets, movies, episodes, timeline, and games.
- `src/lib/audio.ts`: Web Audio API sound effects synthesizer.
- `src/lib/supabase`: Supabase PostgreSQL client with graceful local fallback.
- `supabase/migrations`: SQL schema migrations and RLS policies.

## Key Developer Commands
```powershell
# Run dev server
pnpm run dev

# Run TypeScript type check
npx tsc --noEmit

# Run ESLint
pnpm run lint

# Build for production
pnpm run build
```
