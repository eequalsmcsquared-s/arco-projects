import {getSite,imageUrl,siteUrl} from '@/lib/content';
import Site from '@/components/Site';
export async function generateMetadata(){const d=await getSite();return {title:d.home.seo?.title,description:d.home.seo?.description,alternates:{canonical:siteUrl+'/'},openGraph:{title:d.home.seo?.title,description:d.home.seo?.description,url:siteUrl+'/',images:[imageUrl(d.home.heroImage,1600)]}};}
export default async function Home(){const d=await getSite();return <Site data={d} path="/"/>}
