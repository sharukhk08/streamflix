# StreamFlix (portfolio demo)

A Netflix-style streaming demo built with Next.js 14. It ships in **demo mode**: fictional films, free sample videos, no login and no database.

## Run locally
```bash
npm install --ignore-scripts
npm run dev -- -p 3210      # open http://localhost:3210
```
Copy `.env.example` to `.env.local` and set `DEMO_MODE=true` and `NEXT_PUBLIC_DEMO_MODE=true`.

## Deploy (Vercel)
1. Push this folder to a private GitHub repository.
2. Import it in Vercel (framework: Next.js).
3. No settings are needed: with no Supabase address configured, the app runs in demo mode automatically. (Optional) Add these to be explicit:
   - `DEMO_MODE=true`
   - `NEXT_PUBLIC_DEMO_MODE=true`
   - `NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co` (any placeholder in demo mode)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=demo-anon-key`
4. Deploy and share the link.

## Real mode
Set `DEMO_MODE=false`, add real Supabase keys, create the tables from `database-schema.txt`, and point `NEXT_PUBLIC_VIDEO_CDN` at your HLS host.

## Notes
- All images are generated artwork. Sample videos are public clips streamed from third-party hosts (Mux test stream, Video.js).
- Security headers and a strict Content-Security-Policy apply in production (`next.config.mjs`).
- Run the dev-guard check before `npm install` or any build.
