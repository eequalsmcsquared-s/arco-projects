import {createImageUrlBuilder} from '@sanity/image-url';
import type {ContentImage} from './content';
const builder=createImageUrlBuilder({projectId:'aldhsy2i',dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||'production'});
export function imageUrl(image:ContentImage,width=1400){return builder.image(image).width(width).quality(72).auto('format').url();}
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://arco-projects.pages.dev';
