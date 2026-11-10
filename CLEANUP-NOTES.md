# StreamFlix showcase: cleanup log (2026-11-10)
Source: ~/Downloads/nextjs_frontend-swigg-main (copy; original untouched)
- Malware scan (static): none found. No eval/exec/obfuscation; only normal npm install scripts (core-js, fsevents, speed-insights).
- Removed: .env with real keys, AdSense + Google Analytics, ads.txt, src/not_in_use, hard-coded signed Supabase token, real Supabase host.
- Rebranded Swiigg -> StreamFlix; contact emails -> demo@example.com.
- Video CDN now NEXT_PUBLIC_VIDEO_CDN. See .env.example.
- Added security headers; .gitignore now ignores .env.
- npm audit fix applied (next 14.2.35). Remaining audit items need Next 15+/swiper major: not done.
- Build passes with dummy env values.
TODO: own Supabase project + dummy data (database-schema.txt), deploy.

## CORRECTION: malware WAS present (found 2026-11-10)
- .vscode/tasks.json auto-ran (runOn folderOpen) `node .../src/not_in_use/.../fa-solid-900.woff2`, a font file that is really obfuscated JavaScript (global['!']= loader). .vscode/settings.json enabled task.allowAutomaticTasks.
- Both removed from this copy (.vscode deleted, not_in_use deleted). Never executed by Claude.
- ORIGINAL in ~/Downloads still contains it: do NOT open that folder in VS Code.

## SECOND CORRECTION (2026-11-10, after dev-guard run)
- Payload was ALSO appended (after long whitespace runs) to tailwind.config.js and postcss.config.mjs, plus ".gitignore lists config.bat" fingerprint. Stripped / rewritten / removed.
- `npm run build` was run at 17:28 BEFORE this was found. Next loads those configs, so the payload may have executed once. Post-check (read-only): no new LaunchAgents, no config.bat, no external node connections. Not proof.
- node_modules and .next deleted (rebuild only after `node guard.mjs .` says clean).
- dev-guard result now: clean (1 false-positive warning on next.config.mjs, reviewed by hand).
- Rule: run guard before any npm/build. No .vscode folder. Original in ~/Downloads stays infected: never open.

- 2026-11-10 link/package review: all URLs legit (npm, github refs in lock, placeholders). Removed unused pg-protocol, axios, framer-motion, plyr and unused /api/get-ip route. Social footer links are generic homepages (replace).

## Demo mode (2026-11-10)
- DEMO_MODE=true (in .env.local, gitignored) -> fake movies from src/demo/data.js, no login, no database. Set DEMO_MODE=false + real Supabase keys for real use.
- Run locally: `npm run dev -- -p 3210` (NOT 3100: maddy-cool uses it). Open http://localhost:3210
- Deprecated pkgs left: eslint 8 chain (@humanwhocodes/*, glob, rimraf, inflight): dev-only; fix needs Next 16 / ESLint 9 (breaking).
- Guard false positive: `.next/trace` after any dev run; delete .next then re-run guard.
- Video player is placeholder in demo (no real video source).

## Audit + fix pass (2026-11-10)
- Removed ALL copyrighted/real images (landing + personalise posters, a film still, iStock/Pexels): replaced by generated art in public/demo, public/profile/personalise, public/images.
- Added: genre/type pages (were 404), /help, premium 404, working demo videos (Mux HLS + Video.js mp4 via src/lib/video.js), poster/backdrop art, series with episodes, phone Watch button (was an "app download" promo).
- Fixed: tsconfig moduleResolution (build blocker with TypeScript 6), lazy DB client (500s), invalid SVG props, nested h5, uncaught play() errors, broken links (/terms,/privacy,/help), logo file name.
- Security: CSP + HSTS + frame/nosniff headers (CSP production-only), removed Vercel analytics, no secrets, guard clean.
- Known: npm audit still lists Next 14 advisories (need Next 15/16). Sample videos stream from third-party hosts.
- Verified: 26 routes OK on production build; 404 for bad URLs; video plays under CSP.

## Real thumbnails + logo (2026-11-10)
- Posters now real public-domain film posters from Wikimedia Commons (Metropolis, A Trip to the Moon, The General, Night of the Living Dead, Charade, His Girl Friday, Caligari, Safety Last!, Phantom of the Opera, The Kid, Battleship Potemkin) + Big Buck Bunny (CC BY 3.0, Blender Foundation). Credit line is in the footer. Downloaded 600px copies; originals kept in Claude scratchpad only.
- 3 demo series (Backstage Stories, Case File 404, Laugh Track) still use generated art.
- Videos are sample clips, NOT the real films.
- Logo recoloured to app accent #00FF99 + white. Card text gets a dark gradient for readability. Hero starts muted (browser autoplay rule).
- Prod server for review: `npm run build && npm run start -- -p 3310` (run guard first).

## QA fixes round 2 (2026-11-10)
- Catalogue is now 8 MODERN open-licence films (Blender): Elephants Dream 2006, Big Buck Bunny 2008, Sintel 2010, Tears of Steel 2012, Cosmos Laundromat 2015, Coffee Run 2020, Sprite Fright 2021, Charge 2022 (CC BY 3.0/4.0, credit in footer). 3 generated demo series. Real 2000-2026 blockbuster posters need a TMDB API key + attribution (not added).
- Account page works in demo (client shim in utils/supabase/client.ts); profile create/edit/delete via src/lib/profileApi.js (localStorage in demo). Fixed real bugs: supabase.auth.user() (removed API), deleteProfile arg, create form dropped language/maturity/kids, placeholder alert() on avatar edit, Teens/Mature same value.
- Header: plus menu + bell menu work; phone bottom tab bar (Home/Movies/Series/Watchlist/Search). Nav label "Watch now" -> "Home".
- Watchlist and search results de-duplicated. Signout/forgot/reset password bypass in demo.

## Round 3 (2026-11-10)
- Live link https://streamflix-six-neon.vercel.app checked: 19/19 routes OK, headers OK, images OK, video plays on /watch; but in-page jump Watch now -> player stalled in one browser (fixed with src/lib/nav.js full-page fallback).
- Watchlist button on film page now works (src/lib/watchlistApi.js, browser storage per profile in demo).
- Film page: phone/tablet layout below 1024px (was 768, caused squeezed text), uses the film's own poster + description; brighter backdrops.
- Terms/Privacy pages stack the sidebar on phones. Responsive sweep 375/768/1280: no horizontal overflow, no broken images.
