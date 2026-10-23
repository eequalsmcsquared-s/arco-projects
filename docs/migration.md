# Migration record

Source: https://arcoprojects.co.nz. Crawl date: 23 October 2026, New Zealand time.

The audit combines recursive internal HTML links, public WordPress pages, posts, project and media endpoints, the WordPress type registry, page and project sitemaps, project categories/tags, robots and the legacy project archive. No blog posts or additional genuine case studies were found. The discovered XML-RPC endpoint returns 403 and is an application endpoint, not website content to migrate. No PDFs or other downloadable assets were linked in the crawl.

The source contact details are info@arcoprojects.co.nz, Richard Stanton on 027 532 9086, and Antony Meeuwsen on 027 211 0629. Both names, roles and phone numbers were preserved. No director portraits were discoverable, so none were invented or substituted with stock portraits.

All ten sitemap page URLs are preserved. `/blog` is empty and redirects to `/projects/`. `/project/test-project` is empty test content and redirects to `/projects/`. The legacy `/project` archive also redirects there. `/home` redirects to `/`. Both slash variants are configured. The new Projects page is a photo portfolio because the source has no genuine named case studies. A reusable project schema and route are ready for editor-authored, verified case studies. No fake case-study documents are seeded.

The 57-entry media library is fully accounted for in `image-inventory.json`: 54 original/highest available files imported; three Grow My Business agency marks excluded. The source stock-photo hero is replaced by authentic finished-deck photography. Watermarked stock photos, an Unsplash image, grey rectangles, draft plans and low-resolution marks are retained in the CMS with review flags. They are not used to imply credentials, partnerships or completed projects. No production image loads from the original website.

The original home, services and About copy is retained in `content-before.json`. Duplicate navigation, theme scripts, page-builder instructions, empty FAQ blocks and unsupported superlatives are removed from published content. The New Builds page contained renovation copy; its introduction is rewritten to match the source service positioning. The Decks & Patios module contained a duplicated renovation answer; the service scope now describes outdoor living without inventing an exact deliverable.

FAQ changes: the unqualified extension-value promise is qualified; the generic 6 to 12 month timeline is replaced with project-specific programming; unspecified warranty coverage is referred to the contract discussion. Original wording remains in the audit. Fixed-price quotation wording remains where it appears in source FAQs and should be reviewed by the business. The 30-year combined-experience statement is verified on the source but not displayed until current owner approval. No awards, ratings, licence numbers, memberships, guarantees or project statistics are invented.

Legal pages retain the existing 17 October 2024 wording and date. This is content migration, not legal review. They require owner review for the final email provider, hosting, cookies and data flow. The owner specifically requested no enquiry storage. There are no published testimonials because none could be verified in the source.

The visible design retains Arco's original wordmark and monochrome brand identity. Warm off-white and muted forest green support the original black/white logo. The previous stock imagery and inconsistent template styling were replaced; recognisable branding remains. Georgia provides a system editorial serif; a locally hosted Manrope variable font supplies body and interface text.

`migration-manifest.json` maps every original content entry. `image-inventory.json` maps every media entry. `crawl.json` records titles, links, images and HTTP status. Raw source HTML is retained in the local audit archive. Image asset documents retain original source metadata. All live content is authored in Sanity, including global UI labels and form configuration.
