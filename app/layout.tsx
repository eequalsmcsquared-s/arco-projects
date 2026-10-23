import type {Metadata} from 'next';
import './globals.css';
import {getSite,siteUrl} from '@/lib/content';
export async function generateMetadata():Promise<Metadata>{const {settings:s}=await getSite();return {metadataBase:new URL(siteUrl),title:s.globalSeo.title,description:s.globalSeo.description,icons:{icon:'/favicon.png'},robots:{index:true,follow:true}};}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-NZ"><head><link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous"/><link rel="preload" href="/fonts/Manrope.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body>{children}</body></html>}
