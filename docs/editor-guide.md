# Editor guide

Open `/studio/` on the deployed website and sign in with an authorised Sanity account. The Website section contains the homepage and standard pages. Services, Projects, Company, FAQs, Locations, Forms, SEO and redirects, Site settings and Image migration library have separate sections.

The homepage and Site settings are singletons. Edit the existing documents; do not create duplicates. Site settings controls navigation, logo, contact information, footer, common labels and the closing consultation panel. Homepage controls the hero, ordered service references, photography, values, team references, process references and FAQ selection. Reorder arrays by dragging.

Services are reusable documents. Change a service once and the homepage and service index use the same content. Keep page slugs stable to preserve URLs. Use the SEO fields only when the default title and summary need improvement. Aim for a concise title and an accurate 140 to 160 character description. Leave optional commercial fields empty unless approved.

Projects require genuine supplied information. No test projects were migrated. Add a descriptive name, slug, summary, image and supporting facts, then publish. Do not guess suburbs, duration, budget, architects or client details. Commercial information stays hidden unless enabled. Galleries can be reordered. Before-and-after pairs need accurately matched images and labels. Written content uses constrained Portable Text blocks rather than an unrestricted page builder.

Image descriptions should say what the photograph shows. Do not place a service keyword where an accurate description belongs. Use the crop and hotspot controls for appropriate focal points. Only use imported assets marked for public use. Watermarked stock and placeholders remain for audit purposes and need rights/replacement review. A small source cannot become a sharp large hero simply by increasing its width.

Draft changes stay unpublished. Secure draft preview requires the server secrets listed in the deployment guide. It is currently gated pending approval. Once enabled, open Presentation and allow the secure preview to load; updates refresh every five seconds. Full click-to-edit overlays are not currently enabled. Publishing updates the public site only after the Pages rebuild completes, once the admin webhook is connected. Until then, a Cloudflare rebuild is needed. The webhook permission is a remaining setup item.

Form labels, options, step titles and messages are in Forms. Do not add personal submissions to the CMS. The online form remains unavailable until email delivery and spam protection are configured. The contact page offers email and phone alternatives. Changing form fields also changes server validation because the endpoint reads the same configuration.

Use SEO and redirects to map an old path to a relevant new path. Paths must begin with `/`. Publish and rebuild to apply. Do not create redirect loops. Check the old URL in a private browser window after the deployment succeeds.
