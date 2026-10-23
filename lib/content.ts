import {createClient} from '@sanity/client';
import {defineQuery} from 'groq';
import {createImageUrlBuilder} from '@sanity/image-url';
export const client=createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||'aldhsy2i',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production',apiVersion:'2026-10-01',useCdn:false,perspective:'published'});
export type ContentImage={_key?:string;asset:{_ref:string};alt:string;caption?:string;credit?:string;crop?:Record<string,number>;hotspot?:Record<string,number>};
export type Link={_key?:string;label:string;href:string};
export type Highlight={_key:string;title:string;description:string;number?:string};
export type RichBlock=Record<string,unknown> & {_type:string;_key:string};
export type Content={_id:string;_type:string;title:string;slug?:{current:string};eyebrow?:string;summary?:string;body?:RichBlock[];image?:ContentImage;gallery?:{title?:string;images:ContentImage[]};seo?:{title?:string;description?:string;image?:ContentImage;noIndex?:boolean};kind?:string;scope?:Highlight[];suburb?:string;category?:string;clientObjective?:string;challenges?:string;constructionSolution?:string;outcome?:string;designResponse?:string;duration?:string;budget?:string;showCommercialInformation?:boolean;materials?:string;architect?:string;engineer?:string;faqs?:FAQ[];process?:Stage[];team?:Person[];services?:Content[];projects?:Content[];callToAction?:{title:string;description:string;link:Link};beforeAfter?:{_key:string;title:string;before:ContentImage;after:ContentImage;beforeLabel:string;afterLabel:string}[]};
export type FAQ={_id:string;question:string;answer:RichBlock[];category?:string};
export type Stage={_id:string;title:string;description:string;order:number};
export type Person={_id:string;name:string;role:string;biography:string;portrait?:ContentImage;phone:string;phoneHref:string;qualifications?:string;licence?:string};
export type FormField={_key:string;name:string;label:string;description?:string;kind:string;step:number;required:boolean;options:string[]};
export type FormConfig={title:string;introduction:string;stepTitles:string[];fields:FormField[];privacy:string;consent:string;validationError:string;success:string;unavailable:string;error:string;emailLabel:string;phoneLabel:string};
export type Settings={title:string;logo:ContentImage;tagline:string;navigation:Link[];consultation:Link;email:string;phone:string;phoneHref:string;serviceArea:string;footerText:string;footerLinks:Link[];socialLinks:Link[];globalSeo:{title:string;description:string;image:ContentImage};ui:Record<string,string>;closing:{title:string;description:string;link:Link}};
export type Home={_id:string;title:string;eyebrow:string;heading:string;introduction:string;heroImage:ContentImage;primary:Link;secondary:Link;trustStatements:string[];workEyebrow:string;workTitle:string;workDescription:string;workGallery:{images:ContentImage[]};featuredProjects:Content[];valueTitle:string;valueDescription:string;values:Highlight[];serviceEyebrow:string;serviceTitle:string;services:Content[];teamEyebrow:string;teamTitle:string;teamDescription:string;team:Person[];processEyebrow:string;processTitle:string;process:Stage[];faqs:FAQ[];seo?:Content['seo']};
export type SiteData={settings:Settings;home:Home;pages:Content[];services:Content[];projects:Content[];faqs:FAQ[];team:Person[];process:Stage[];form:FormConfig;redirects:{source:string;destination:string;permanent:boolean}[]};
export const SITE_QUERY=defineQuery(`{
 "settings":*[_type=="siteSettings"][0],
 "home":*[_type=="homepage"][0]{...,services[]->,team[]->,process[]->,faqs[]->,featuredProjects[]->},
 "pages":*[_type=="page"]{...,services[]->,team[]->,process[]->,faqs[]->},
 "services":*[_type=="service"]|order(order asc){...,faqs[]->,process[]->,projects[]->},
 "projects":*[_type=="project"]|order(publishedAt desc){...,services[]->},
 "faqs":*[_type=="faq"],"team":*[_type=="teamMember"],"process":*[_type=="processStage"]|order(order asc),
 "form":*[_type=="enquiryForm"][0],"redirects":*[_type=="redirect"]{source,destination,permanent}
}`);
export async function getSite():Promise<SiteData>{const data=await client.fetch<SiteData>(SITE_QUERY);if(!data.settings||!data.home)throw new Error('Published Sanity content is required. Run the migration before building.');return data;}
const builder=createImageUrlBuilder(client);
export function imageUrl(image:ContentImage,width=1400){return builder.image(image).width(width).quality(85).auto('format').url();}
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://arco-projects.pages.dev';
