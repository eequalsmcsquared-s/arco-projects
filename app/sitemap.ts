import type {MetadataRoute} from 'next';import {getSite,siteUrl} from '@/lib/content';
export const dynamic='force-static';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const d=await getSite();return ['/',...d.pages.filter(p=>!p.seo?.noIndex).map(p=>`/${p.slug!.current}/`),...d.services.map(p=>`/services/${p.slug!.current}/`),...d.projects.map(p=>`/project/${p.slug!.current}/`)].map(p=>({url:siteUrl+p}));}
