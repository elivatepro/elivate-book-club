# Elivate Web Experience – End-to-End Build Plan

## Phase 1 – Discovery & Alignment
1. **Stakeholder Intake**
   - Confirm goals for public site (membership growth, author pipeline, trust signaling).
   - Capture KPIs, launch timeline, required integrations (email provider, payment, forum platform).
2. **Content Inventory**
   - Source-of-truth copy: `Elivate Website Copy.txt`.
   - Ensure legal + accessibility statements from `Elivate Brand Guidelines.md` are approved.
3. **Visual Direction**
   - Validate `Elivate Brand Guidelines Visual.html` as the interaction reference.
   - Lock photography direction using `/Images` library; shortlist images per section (see Appendix).
4. **Competitive / Best-Practice Review**
   - Analyze `Effective UI_UX Elements to Enhance Website Engagement.html` for UI/UX cues: hero metadata stacks (author, read time), related-content sidebars, sticky navigation patterns, micro-interaction usage, and smooth reading experiences (Lenis/Lottie usage).
   - Select transferable patterns and document how they’ll map to Elivate counterparts (e.g., “Related Services” → “Upcoming Events,” hero badges for current selection).

## Phase 2 – Experience Architecture
1. **Information Architecture**
   - Define sitemap: Home, Current Selection, Membership, About, Author Support, Trust & Standards, Events, Resources.
   - Map navigation + footer links; include “Join” CTA persistent in nav.
2. **Wireframes**
   - Low-fidelity sketches for each template highlighting typography hierarchy, grid, imagery placement.
   - Annotate hero heights, CTA placement, modifiers for states (e.g., membership comparison tables).
3. **Interaction & Reference Mapping**
   - For each template, note which borrowed patterns from the Fourmeta article apply (e.g., hero metadata cluster on article pages, sidebar for auxiliary content, progressive disclosure modules).
   - Decide early if advanced elements (preloader curtain, sticky TOC, smooth-scroll) are needed; capture any technical constraints.
4. **Footer Experience**
   - Design a bespoke wave-top footer inspired by the Helsinki reference: layered background, multi-column navigation, contact/feedback row, social icons, and a secondary row with badge-style wordmark plus “Back to top”.
   - Ensure the component is responsive (stacked on mobile, horizontal on desktop) and reusable across every page; document behaviors (e.g., arrow link snapping to `#top`).

## Phase 3 – Design System & Tooling
1. **Token Consolidation**
   - Import `/Elivate Design Tokens.css` into Tailwind config.
   - Expand `tailwind.config.js` if additional utilities (animations, spacing) are required.
2. **Component Library**
    - Build reusable sections with Tailwind: hero, CTA banner, card grids, timeline, FAQ accordion, membership comparison, event list, testimonial block.
    - Document component props/examples in Storybook or simple pattern library page.
3. **Micro‑Interaction Spec**
    - Define animation rules using tokenized durations (`150–350ms`) and ease curves (`ease-out`, `ease-in-out` from tokens).
    - Identify elements that deserve motion: button hover/focus, nav underline, card reveals, image fades, minimal scroll-triggered opacity/translate for hero copy.
    - Provide accessibility guidance (reduced motion respect, optional toggle) per guidelines §11.
4. **Smart Pagination**
    - Design a compact, scrollable pagination component (current page pill, surrounding range, ellipsis, “Last” slot, Next arrow) inspired by the provided reference.
    - Primary placements: Events archive (months/years), Resources archive (past reading guides), future editorial/article indexes. Ensure it stacks on mobile (wrap) and remains keyboard accessible.
5. **Author Program Page System**
     - Implement “For Authors” page using `elivate-author-page-content.md` and `elivate-author-page-design-specs.md`: hero with dual CTA, data stat cards, threshold chart, process flow, comparison table, pricing cards, ROI infographic, line graph, FAQ accordion, testimonials, and layered CTAs.
     - Enforce compliance messaging from `elivate-author-program-implementation.md`: emphasize Amazon TOS alignment, no guaranteed positive reviews, verified purchase requirement, transparent stipends, and ethical positioning.
6. **Imagery Completion Plan**
     - Place remaining photo assets intentionally: author hero uses a photographic backdrop with dark overlay; add supporting imagery to author sections (e.g., reader profiles/credibility blocks) and other relevant pages to reduce unused assets. Maintain texture/lighting consistency with existing brand photography and ensure alt text plus responsive crops.
7. **About Page Enhancements**
     - Update founding year to 2004 and weave additional imagery into the About page (hero side image and supportive culture/community shots) following visual guidelines and maintaining readability of overlaid text.
8. **Author Process Redesign**
     - Rework the Authors page “Process” section into a more intuitive, visually guided timeline with improved readability (clear step numbering, connectors, and adequate type sizing) while preserving compliance messaging.
3. **Imagery Treatment**
    - Apply consistent color grading (warm neutrals) to selected photos.
    - Export responsive crops (desktop 3:2, mobile 4:5) with descriptive filenames.

## Admin System & Content Management Sub-Plan
1. **Authentication & Access**
   - Single admin user with email/password (or SSO if available) to access `/admin`.
   - Scoped API tokens per environment; no anonymous access to draft/publish endpoints.
2. **Content Editing UI**
   - Modular editors for key models: Current Selection, Events, Resources, Membership tiers, Author Program, About, FAQs, Testimonials, Trust/Policies, Media (alt text required).
   - Forms with validation (required fields, URL/date checks, alt text enforcement) and preview for rich text.
3. **Workflows & Publishing**
   - Draft → Publish with optional schedule; maintain change history.
   - Export/import JSON for backup and for syncing to the static site if needed.
4. **Audit & Logging**
   - Log sign-ins and publish actions; show last edited/published metadata per entry.
5. **Media Management**
   - Upload with focal point, tags, orientation; enforce alt text; store responsive crops or allow on-the-fly transforms.
6. **Frontend Integration**
    - `/admin` deployed on Vercel within the Next.js app; public site consumes published data via API or database queries.
    - Webhooks or `revalidate()` calls to trigger ISR on publish/unpublish.
7. **Security**
   - HTTPS only, strong password requirements, optional 2FA via SSO; rate limit login attempts; hide `/admin` behind auth and environment secrets.
8. **Migration & Backup**
   - Seed initial data from current static pages; provide JSON backup/restore flow; document rollback steps.

## Admin Implementation (Next.js + Vercel Postgres)
1. **Stack & Structure**
   - Next.js App Router (preferred) or Pages Router with `/admin` route for the UI.
   - API routes under `/app/api/admin/*` (or `/pages/api/admin/*`) for auth and content CRUD.
   - Vercel Postgres for persistence; content table keyed by section, storing JSON payloads per model.
2. **Auth**
   - Single admin password via `ADMIN_PASSWORD`; session token (HTTP-only cookie) signed with `JWT_SECRET`.
   - Middleware to protect `/admin` API routes and optionally the `/admin` page.
3. **Database Schema (Vercel Postgres)**
   - Table `content`: `id SERIAL`, `section TEXT PRIMARY KEY`, `data JSONB`, `updated_at TIMESTAMPTZ`, `updated_by TEXT`.
   - Table `sessions`: `token TEXT PRIMARY KEY`, `created_at TIMESTAMPTZ`, `expires_at TIMESTAMPTZ`.
   - (Optional) `media` table if storing metadata; otherwise store URLs/alt inside JSON payloads.
4. **API Routes**
   - `POST /api/admin/login`: validate password, issue signed cookie, create session record.
   - `GET /api/admin/content/[section]`: return JSON for a section (protected).
   - `PUT /api/admin/content/[section]`: upsert JSON for a section, update audit fields, trigger revalidate.
   - `POST /api/admin/revalidate`: call `res.revalidate()` for affected pages.
5. **Admin UI**
   - `/admin` page renders login (if no session) or dashboard.
   - Dashboard: sidebar of sections (Current Selection, Events, Resources, Membership, About, Author Program, Trust, FAQs, Testimonials, Globals).
   - Editors: form-driven with validation; limited rich text; image URL + alt inputs (or future upload flow).
   - Save calls `PUT /api/admin/content/[section]`; show last saved/published meta.
6. **Frontend Consumption**
   - Public pages fetch published data via server-side calls to Vercel Postgres (using Next.js data fetching) or via ISR fetching API routes.
   - Fallback content (static defaults) if DB unavailable.
7. **Revalidation**
   - On successful `PUT`, call `res.revalidate()` for impacted routes (e.g., `/`, `/current-selection`, `/events`, `/resources`, `/authors`).
8. **Env Vars (Vercel)**
   - `ADMIN_PASSWORD`, `JWT_SECRET`, `POSTGRES_URL` (or Vercel-provided connection string).
9. **Migration**
   - Seed `content` table with current static content per section (import JSON).
   - Provide a CLI/script to export/import JSON for backup/restore.

## CMS Sub-Plan (Content Platform)
1. **Objectives**
   - Centralize all site content (pages, sections, images, CTAs, events, resources, author program) with versioning, drafts/publish, scheduling, and roles/permissions.
   - Provide a secure API for frontend consumption with asset delivery (responsive crops, alt text enforcement).
2. **Content Models**
   - Globals (nav, footer, social, tokens snapshot), Homepage, Current Selection (book, schedule, events, themes), Membership (tiers, FAQs, commitments), About (story, process, team, values, images), Author Program (hero, stats, thresholds, process, comparison, packages, ROI, FAQs, testimonials, compliance blocks, CTAs), Events, Resources, Testimonials, FAQs, Trust & Standards, Author Submissions (form + workflow), Media library (alt text, focal point, tags).
3. **Roles & Workflow**
   - Roles: Admin, Editor, Authoring, Reviewer, Media Manager, Read-only.
   - Draft → Review → Publish with scheduled publish/unpublish; required alt text on upload; submission review workflow.
4. **Tech Stack**
   - Headless CMS (e.g., Sanity/Contentful/Strapi), CDN-backed assets, API tokens per environment, webhooks for rebuild/ISR, optional preview mode.
5. **Validation & Governance**
   - Required fields, enums for types/status, restricted rich text marks, URL validation, time zone-consistent datetime fields, image aspect/crop hints.
6. **Migration & Consumption**
   - Extract current static content to structured JSON/CSV, bulk import to CMS, map images with tags, swap frontend to CMS queries, enable preview, cache/purge strategy.
7. **Timeline**
   - W1: Select CMS, model globals/home/current selection/membership.
   - W2: Model author program, about, trust, testimonials, FAQs.
   - W3: Model events/resources/media; roles/permissions.
   - W4: Migrate content, wire frontend, QA accessibility, go-live.

## Phase 4 – Content Implementation
1. **Homepage**
   - Hero: use `Images/Woman Reading a Book.jpg`, overlay primary CTA.
   - “How Elivate Works” section using structured cards tied to copy.
   - Testimonials/positioning statements anchored by `Elivate Brand Guidelines`.
2. **Current Selection Page**
   - Dynamic data model (book title, schedule, leader) seeded from CMS or JSON.
   - Use `Images/Person Reading Book.jpg` for feature hero until official cover art.
3. **Membership Page**
   - Table built from copy; highlight Premium/Patron tiers.
   - Photography: `Images/People Reading Book.jpg` for community emphasis.
4. **About & Trust Pages**
   - Timeline / editorial process visual.
   - Pull quotes from guidelines; include `Images/Women Seated Wooden Table.jpg` for team depiction.
5. **Author Support Page**
   - Step-by-step submission process with iconography (line-based per guidelines).
6. **Events & Resources**
   - Event cards w/ filters; placeholder image `Images/Casual Gathering of Friends.jpg`.
   - Resources page uses accordions for reading guides, educator/library toolkits.

## Phase 5 – Engineering & Integration
1. **Stack**
   - Static site generator (Next.js / Astro) or traditional build with Tailwind CLI.
   - Use Markdown/MDX for long-form sections referencing copy doc.
2. **CMS (Optional)**
   - If dynamic: integrate Sanity/Contentful for book selections, events, blog posts.
3. **Forms & Auth**
   - Hook membership CTAs to existing platform (e.g., Memberstack, custom portal).
   - Ensure accessibility compliance (labels, focus states per tokens).
4. **Motion Implementation**
   - Use Tailwind `transition` utilities with tokenized durations. Example: `transition-all duration-200 ease-out` on buttons, `duration-300` for card hover lift.
   - Add subtle scroll-triggered animation (e.g., `opacity-0 translate-y-6` to `opacity-100 translate-y-0`) via Intersection Observer; disable when `prefers-reduced-motion` is set.
   - For hero imagery, apply slow parallax or scale (`scale-105` on hover) capped at 5% to maintain seriousness of brand.
5. **Performance**
   - Optimize images via responsive `<picture>` elements and modern formats (WebP/AVIF).
   - Purge unused Tailwind classes; leverage caching.

## Phase 6 – QA & Launch
1. **Testing**
   - Cross-browser (Chrome, Safari, Firefox, Edge) and responsive breakpoints (375 / 768 / 1024 / 1440).
   - Accessibility audit (axe, manual screen-reader).
   - Content review vs checklist in guidelines §10.2.
2. **Analytics & Monitoring**
   - Install privacy-conscious analytics (Plausible/Fathom).
   - Uptime monitoring for key pages/events.
3. **Launch Checklist**
   - Confirm SEO metadata, Open Graph images, sitemap submission.
   - Verify membership/payment flows end-to-end.
   - Prep communications (newsletter, author partners).

## Phase 7 – Post-Launch Evolution
1. **Feedback Loop**
   - Gather member/author feedback; log change requests per guidelines §10.4.
2. **Iteration Backlog**
   - Future features: archive browsing, member testimonials, local chapter map.
3. **Governance**
   - Monthly audits ensure new assets adhere to tokens + Tailwind config.

---

### Appendix – Recommended Image Usage
| Page/Section | File | Notes |
|--------------|------|-------|
| Hero | `Images/Woman Reading a Book.jpg` | Authentic indoor reading scene. |
| How It Works | `Images/Group of People Sitting in a Room.jpg` | Discussion setting. |
| Membership | `Images/Young Women Reading Books.jpg` | Community emphasis. |
| About/Team | `Images/Women Seated Wooden Table.jpg` | Collaborative tone. |
| Events | `Images/Casual Gathering of Friends.jpg` | Live discussions visual. |
| Resources | `Images/Teacup on Books.jpg` | Still-life for calm educational vibe. |
| Author Support | `Images/Man Reading Book.jpg` | Spotlight on authors/readers. |
| Footer/Quote Banner | `Images/White Teacup with Saucer.jpg` | Minimalist background option. |

Replace placeholders with official photography if new shoots occur, but stay within the stylistic guidance from Brand Guidelines §7.2.
