# Deployment and security

Cloudflare Pages project: `arco-projects`. Production branch: `main`. Build command: `npm run build`. Output: `out`. Node: 24. Compatibility date: 2026-10-23. Primary public pages use Next.js static generation. Sanity Studio is built to `/studio/`. Server endpoints run as a Pages advanced-mode module Worker.

## Public configuration

`NEXT_PUBLIC_SANITY_PROJECT_ID=aldhsy2i`, `NEXT_PUBLIC_SANITY_DATASET=production`, `NEXT_PUBLIC_SITE_URL=https://arco-projects.pages.dev`. Change the site URL and rebuild when an approved custom domain is connected. Never publish tokens under a `NEXT_PUBLIC_` name.

## Draft preview

The owner approved the preview secrets, which are now configured in Cloudflare. For future environments, set `SANITY_READ_TOKEN` as a Cloudflare encrypted secret with Viewer access. Set `PREVIEW_SECRET` to at least 32 cryptographically random bytes. Do this for approved environments only. The read token remains server-side. No write token is required by the deployed website. Preview links are validated against Sanity, and cookies expire after one hour. Draft JSON uses no-store caching and requires the signed cookie.

Studio's Presentation tool opens `/api/preview/` and redirects to `/preview/?path=/`. Draft content refreshes every five seconds. Draft mode is isolated from public routes. Use Exit preview to clear the cookie. Full visual-editing overlays and content-release perspectives are not part of the current custom preview implementation.

## Automatic content publishing

A Pages deploy hook is already created. Its URL is a secret and is not committed. A Sanity administrator must connect a document webhook with POST, dataset production, create/update/delete triggers, draft/version triggers off, GROQ API v2021-03-25, and this rule:

```groq
!(_id in path("drafts.**")) &&
!(_id in path("versions.**")) &&
!(_type in ["sanity.imageAsset", "sanity.fileAsset", "assetRecord"])
```

Projection: `{_id, _type}`. A publish then causes a fresh Pages build, with updates visible after that deployment succeeds. This is an automatic static rebuild rather than Next.js ISR. The setup is not complete until a real published change and subsequent deployment have been verified. Keep the hook URL private.

## Email-only enquiries, with no submission storage

Until an email provider is supplied, the contact page shows phone/email alternatives and the submission API returns 503. To enable the existing multi-step form, configure all of:

- `RESEND_API_KEY`: encrypted API secret.
- `ENQUIRY_FROM`: approved sending identity from a verified domain.
- `ENQUIRY_TO`: the approved receiving mailbox.
- `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: use a widget restricted to the deployed hostname.
- `FORM_LIMITS`: a KV namespace for anti-abuse counters, not enquiry data.
- `PREVIEW_SECRET`: a random HMAC secret, also used to anonymise rate-limit keys.

The endpoint validates same-origin requests, a 16 KB body limit, field types and lengths, required fields, select options, email format, consent, a honeypot, elapsed form time, Turnstile token and hostname. It limits attempts to five per ten-minute window. KV consistency means this is a best-effort abuse limit; use a Cloudflare rate-limit rule for a strict edge limit if needed. Security counters expire after 11 minutes. Email delivery is awaited, with errors returned rather than silently accepted. No request-body logging, Sanity enquiry document, database, file or browser storage is used. The selected email provider will process and retain the delivered message under its own policy. Review privacy wording accordingly.

## Environments and rollback

Production is public content only. Staging is a private Sanity dataset; the frontend configuration supports choosing a dataset through environment variables. A third dataset was refused by the current plan quota. Staging data has not been duplicated or exposed. A staging Studio may use an explicitly approved environment setting.

Git branches trigger preview deployments. Roll back from Cloudflare Pages deployment history, or revert the relevant Git commit and let Pages rebuild. Content changes should be reviewed in Sanity's history. Never rerun the initial import on a live editorial dataset without review: it uses `createOrReplace` and is intended only for initial migration.

## Analytics

No analytics runs by default. Add GA4, optional privacy-conscious analytics, and Search Console only after the IDs, domain and consent requirements are approved. Never send names, email addresses, phone numbers, descriptions or budget text to analytics. See `analytics-events.md`.
