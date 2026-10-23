# Arco Projects

Next.js 16.4, React 19, TypeScript, Sanity 6 and Cloudflare Pages.

- Website: https://arco-projects.pages.dev
- Studio: https://arco-projects.pages.dev/studio/
- Sanity project: `aldhsy2i`, production dataset

## Local development

Use Node 24. Run `npm ci`, then `npm run dev`. Copy `.env.example` to `.env.local` for local settings. `npm run studio` runs the standalone editor. All public business content is queried from Sanity; the frontend has no bundled content fallback.

`npm run build` builds Studio, statically generates the public Next.js pages, and prepares Pages redirects, headers and the API worker. Deploy `out`. `npm run typecheck` checks the maintained TypeScript content models. `npm run audit` runs the accessibility, navigation and responsive checks against `TEST_URL`, or the local preview server on port 4387.

## Publishing and preview

The GitHub main branch is connected to Cloudflare Pages. A Pages deploy hook named **Sanity content publishing** exists. Connecting the corresponding Sanity webhook requires a project administrator with `sanity.project.webhooks/create`; it is not configured by the migration token. See `docs/deployment.md` for its filter. Without that hook, a GitHub change or a manually triggered Cloudflare deployment updates the static content.

Authenticated draft preview is implemented at `/api/preview/`, using Sanity's preview URL validator and an HMAC-signed, HttpOnly cookie. It requires the `SANITY_READ_TOKEN` and `PREVIEW_SECRET` Cloudflare secrets. The user approved both secrets and they are configured in Cloudflare. End-to-end preview verification requires a signed-in Studio session. Unauthenticated draft APIs return 401. The public bundle contains no credentials. Studio includes Presentation configuration; full visual click-to-edit overlays are a future enhancement. Drafts never appear in public GROQ queries.

## Enquiries

**Do not store enquiry submissions.** This is the owner's instruction for this implementation. No enquiry database or CMS collection exists, and the API does not log request bodies. Phone and email links work directly. The website form stays disabled while its email delivery and spam-protection settings are absent. It never claims an enquiry was sent when delivery has not succeeded.

The optional delivery endpoint supports Resend with an approved sending domain, Turnstile, and short-lived, HMAC-anonymised KV security counters. These counters contain no enquiry fields. Configure all required bindings and secrets before enabling. See `docs/deployment.md`. No live emails were sent during testing.

## Migration

The source was crawled on 23 October 2026 through HTML, both XML sitemaps and all public WordPress content endpoints. Twelve content entries were found: eleven pages and one empty test project. There were no posts or genuine published case studies. The 57-item media library is accounted for: 54 assets imported to Sanity, three unrelated agency branding assets excluded. Watermarked stock assets and grey placeholders are archived in the CMS but never displayed. All displayed project photography is served from Sanity.

See `audit/` for crawl, content-before, migration and image inventories, and `docs/migration.md` for decisions and review items. There are no fictional projects, testimonials, dates, budgets, licence numbers or business statistics. The original 30-year combined-experience statement is recorded in the source inventory and held from public display pending current company approval.

## Remaining launch setup

- Approve the server-only preview secrets and admin webhook connection.
- Supply an email delivery provider and approved sending domain before enabling the form.
- Review migrated legal text, optional claims, image rights and content before replacing the existing business domain.
- Add measurement IDs and Search Console verification only when supplied. Tracking is off by default.
- One private staging dataset exists. The current plan declined a third development dataset, so local development can use production read-only until the owner selects another arrangement.

The original website and its DNS have not been changed. This is a separate deployment.
