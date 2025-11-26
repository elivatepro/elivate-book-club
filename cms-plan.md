# CMS Build Plan – Elivate

## Objectives
- Centralize all site content (pages, sections, CTAs, imagery, events, resources, author program) with versioning, draft/publish, scheduling, and permissions.
- Enforce accessibility and brand guardrails (alt text required, limited rich text marks, token-aligned colors/spacing).
- Expose a secure API for the frontend with responsive asset delivery.

## Recommended Stack
- Headless CMS: **Sanity** (portable text, strong image pipeline) or **Contentful** (enterprise roles), or **Strapi** (self-hosted). Choose based on hosting/security prefs.
- Assets: CMS-managed with CDN; enable focal point + on-demand resizing (WebP/AVIF).
- Auth: CMS-native + SSO option; scoped API tokens per environment (dev/stage/prod).
- Webhooks: Trigger rebuild/ISR on publish/unpublish.

## Content Models
- **Globals**: nav links, footer links, social, brand meta (OG/fav), announcement bar.
- **Homepage**: hero (headline, subhead, CTAs, bg image), “How it works” cards, current selection summary, membership teaser, testimonials, events teaser, resources teaser.
- **Current Selection**: title, author, genre, pages, pace, themes, hero image, schedule (weeks/dates/chapters/prompts), events (live sessions), guide link, why-chosen, lead/moderator.
- **Membership**: tiers (name, price, cadence, features, badge), FAQs, commitments.
- **About**: story, founding year, process steps, team roles, values, hero/secondary images.
- **Author Program**: hero, stats cards, thresholds, process steps, comparison rows, packages, ROI data, FAQs, testimonials, compliance statements, CTAs, imagery.
- **Events**: title, date/time + tz, location/link, type, description, registration URL, image.
- **Resources**: type (guide/toolkit/partner), title, description, link/file, audience tags (educators/libraries/bookstores), image.
- **Testimonials**: quote, name, role, category, headshot/cover.
- **FAQs**: question, answer, category (Membership/Authors/Trust/etc.).
- **Trust & Standards**: policy blocks, moderation steps, privacy bullets, rights.
- **Author Submissions**: form fields (title, author, genre, ASIN, synopsis, pages, pub date, package interest), status (submitted/review/accepted/declined), reviewer notes.
- **Media Library**: file, alt text (required), focal point, tags (page/section/theme), orientation, crop variants.

## Roles & Permissions
- Single user admin with read/write/publish rights (no additional roles needed initially); can expand roles later if team grows.
- Workflow: Draft → Publish (or scheduled publish/unpublish); alt text required.

## Validation & Guardrails
- Required fields on hero CTAs, alt text, dates/URLs.
- Enum fields for types/status; rich text limited to bold/italic/link/list.
- URL validation (http/https/mailto); timezone-normalized datetimes for events.
- Image guidelines: recommend aspect ratios and crop presets per placement.

## Migration Plan
- Extract current static content to structured JSON/CSV aligned to models.
- Map images to media library with tags/alt; upload with focal points.
- Bulk import (CMS importer), then manual QA for imagery and rich text.

## Frontend Integration
- Replace hardcoded content with CMS queries; keep layout/components in code.
- Implement preview mode for drafts; fallback to published content for public.
- Cache responses; ISR/rebuild on webhook events; graceful offline/cached states.

## Analytics & Compliance
- Track publish events via webhooks; log changes on compliance-sensitive pages (Trust, Author Program).
- Enforce alt text and heading hierarchy; ensure color/contrast unchanged by content.

## Timeline (4 Weeks)
- **W1**: Select CMS; model Globals/Home/Current Selection/Membership; set roles.
- **W2**: Model Author Program/About/Trust/Testimonials/FAQs; configure validation.
- **W3**: Model Events/Resources/Media; webhook + API tokens; preview mode.
- **W4**: Migrate content, hook frontend, QA (accessibility/performance), go-live.

## Next Steps
- Pick CMS vendor (Sanity/Contentful/Strapi).
- Approve content models and roles.
- Start migration scripts and webhook wiring.
