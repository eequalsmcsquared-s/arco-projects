import fs from 'node:fs/promises';
import {build} from 'esbuild-wasm';
import {createClient} from '@sanity/client';
const client=createClient({projectId:'aldhsy2i',dataset:'production',apiVersion:'2026-10-01',useCdn:false});
const redirects=await client.fetch('*[_type=="redirect"]{source,destination,permanent}');
const rules=[];for(const r of redirects){if(!/^\/(?!\/)[^\s]*$/.test(r.source)||!/^\/(?!\/)[^\s]*$/.test(r.destination))throw Error('Invalid redirect.');for(const source of new Set([r.source.replace(/\/$/,''),r.source.replace(/\/$/,'')+'/']))rules.push(`${source} ${r.destination} ${r.permanent?301:302}`)}
await fs.writeFile('out/_redirects',rules.join('\n')+'\n');
await fs.writeFile('out/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/studio/*\n  X-Robots-Tag: noindex, nofollow\n/preview/*\n  X-Robots-Tag: noindex, nofollow\n');
await build({absWorkingDir:process.cwd(),tsconfig:'tsconfig.json',entryPoints:[process.cwd()+'/cloudflare/worker.mjs'],outfile:'out/_worker.js',bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,define:{'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID':'"aldhsy2i"','process.env.NEXT_PUBLIC_SANITY_DATASET':'"production"','process.env.NEXT_PUBLIC_SITE_URL':'"https://arco-projects.pages.dev"'}});
await fs.writeFile('out/_routes.json',JSON.stringify({version:1,include:['/api/*','/preview/*','/studio/*'],exclude:['/studio/static/*']}));
console.log(`Cloudflare Pages output ready, ${redirects.length} redirect rules.`);
