# Elivate Admin (Next.js + Vercel Postgres)

Self-contained admin app for editing site content without a separate backend.

## Stack
- Next.js (App Router)
- Vercel Postgres (@vercel/postgres)
- Auth: single admin password + JWT cookie

## Setup
1. `cd next-admin`
2. `npm install`
3. Create `.env.local` from `.env.example` and set:
   - `ADMIN_PASSWORD` — your admin password
   - `JWT_SECRET` — random secret for signing JWTs
   - `POSTGRES_URL` — Vercel Postgres connection string
4. `npm run dev` to run locally. Admin UI at `/admin`.

## API Routes
- `POST /api/admin/login` — sets `admin-token` cookie on valid password
- `GET /api/admin/me` — checks session
- `GET/PUT /api/admin/content/[section]` — read/write JSON for a section
- `POST /api/admin/revalidate` — revalidates paths after publish

## Content Storage
Content is stored per `section` row in the `content` table as JSONB. The admin UI edits the JSON directly.

## Revalidation
On save, the admin UI calls `/api/admin/revalidate` for common pages (`/`, `/current-selection`, `/events`, `/resources`, `/authors`). Adjust as needed.

## Notes
- This is a minimal scaffold; extend schemas/validators to enforce shapes per section.
- Protect prod admin with strong password/SSO and keep env vars in Vercel project settings.
