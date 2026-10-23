import {createClient} from '@sanity/client';
import {validatePreviewUrl} from '@sanity/preview-url-secret';
import {SITE_QUERY} from '../lib/content';
const projectId='aldhsy2i',dataset='production';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const encoder=new TextEncoder();
async function hmacKey(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
async function sign(value,secret){const bytes=new Uint8Array(await crypto.subtle.sign('HMAC',await hmacKey(secret),encoder.encode(value)));return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');}
async function authorised(request,env){if(!env.PREVIEW_SECRET)return false;const value=request.headers.get('Cookie')?.match(/(?:^|;\s*)arco_preview=([^;]+)/)?.[1];if(!value)return false;const [expires,signature]=value.split('.');if(!expires||!signature||Number(expires)<Date.now())return false;try{const bytes=Uint8Array.from(atob(signature.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));return await crypto.subtle.verify('HMAC',await hmacKey(env.PREVIEW_SECRET),bytes,encoder.encode(expires));}catch{return false;}}
function sanity(env,drafts=false){return createClient({projectId,dataset,apiVersion:'2026-10-01',useCdn:!drafts,perspective:drafts?'drafts':'published',token:drafts?env.SANITY_READ_TOKEN:undefined});}
function enabled(env){return Boolean(env.RESEND_API_KEY&&env.ENQUIRY_FROM&&env.ENQUIRY_TO&&env.TURNSTILE_SECRET_KEY&&env.TURNSTILE_SITE_KEY&&env.FORM_LIMITS);}
export default {async fetch(request,env,ctx){const url=new URL(request.url),path=url.pathname.replace(/\/$/,'');try{
 if(path==='/api/form-status')return json({enabled:enabled(env),siteKey:enabled(env)?env.TURNSTILE_SITE_KEY:undefined});
 if(path==='/api/preview'){
  if(!env.SANITY_READ_TOKEN||!env.PREVIEW_SECRET)return json({error:'Preview is unavailable.'},503);
  const {isValid,redirectTo='/'}=await validatePreviewUrl(sanity(env,true),request.url);if(!isValid)return json({error:'Unauthorised preview.'},401);
  const expires=String(Date.now()+60*60*1000),signature=await sign(expires,env.PREVIEW_SECRET);const target=redirectTo.startsWith('/')&&!redirectTo.startsWith('//')?redirectTo:'/';return new Response(null,{status:303,headers:{Location:`/preview/?path=${encodeURIComponent(target)}`,'Set-Cookie':`arco_preview=${expires}.${signature}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600`,'Cache-Control':'no-store'}});
 }
 if(path==='/api/preview-exit')return new Response(null,{status:303,headers:{Location:'/','Set-Cookie':'arco_preview=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0','Cache-Control':'no-store'}});
 if(path==='/api/draft-content'){
  if(!await authorised(request,env))return json({error:'Unauthorised preview.'},401);
  const data=await sanity(env,true).fetch(SITE_QUERY);return json(data);
 }
 if(path==='/api/enquiry'){
  if(request.method!=='POST')return json({error:'Method not allowed.'},405);
  if(request.headers.get('Origin')!==url.origin)return json({error:'Invalid origin.'},403);
  if(!enabled(env))return json({error:'Online enquiries are unavailable. Please use email or phone.'},503);
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'Unsupported content type.'},415);
  if(Number(request.headers.get('Content-Length')||0)>16000)return json({error:'Request too large.'},413);
  const reader=request.body?.getReader();let bytes=0,chunks=[];if(reader){while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>16000){await reader.cancel();return json({error:'Request too large.'},413);}chunks.push(value)}}const merged=new Uint8Array(bytes);let offset=0;for(const chunk of chunks){merged.set(chunk,offset);offset+=chunk.length;}let input;try{input=JSON.parse(new TextDecoder().decode(merged))}catch{return json({error:'Invalid request.'},400)}
  if(!input||typeof input!=='object'||Array.isArray(input))return json({error:'Invalid request.'},400);
  if(input.website||typeof input.started!=='number'||Date.now()-input.started<3000||Date.now()-input.started>86400000)return json({error:'Invalid request.'},400);
  const ip=request.headers.get('CF-Connecting-IP')||'unknown';const hash=await sign(ip,env.PREVIEW_SECRET);const bucket=`security:${hash}:${Math.floor(Date.now()/600000)}`;const count=Number(await env.FORM_LIMITS.get(bucket)||0);if(count>=5)return json({error:'Please wait before trying again.'},429);await env.FORM_LIMITS.put(bucket,String(count+1),{expirationTtl:660});
  const {success,hostname}=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:String(input.turnstile||''),remoteip:ip}),signal:AbortSignal.timeout(10000)}).then(r=>r.json());if(!success||hostname!==url.hostname)return json({error:'Verification failed.'},400);
  const form=await sanity(env).fetch('*[_type=="enquiryForm"][0]{fields[]{name,label,required,kind,options}}');const rows=[];
  for(const f of form.fields||[]){const v=input[f.name];if(v!==undefined&&typeof v!=='string')return json({error:'Invalid field.'},400);const value=(v||'').trim();if(value.length>(f.kind==='textarea'?5000:300))return json({error:'Field too long.'},400);if(f.required&&!value)return json({error:'Missing required field.'},400);if(f.kind==='email'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return json({error:'Invalid email.'},400);if(f.kind==='select'&&value&&!f.options?.includes(value))return json({error:'Invalid option.'},400);rows.push(`${f.label}: ${value}`);}
  if(input.consent!=='yes')return json({error:'Consent required.'},400);
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.ENQUIRY_FROM,to:[env.ENQUIRY_TO],reply_to:input.email,subject:'Website consultation enquiry',text:rows.join('\n\n')+'\n\nConsent: agreed to contact about this enquiry.'}),signal:AbortSignal.timeout(15000)});
  if(!response.ok)return json({error:'Email delivery failed. Please contact the team directly.'},502);
  return json({success:true});
 }
 if(path.startsWith('/api/'))return json({error:'Not found.'},404);
 const response=await env.ASSETS.fetch(request);const secured=new Response(response.body,response);secured.headers.set('X-Content-Type-Options','nosniff');secured.headers.set('Referrer-Policy','strict-origin-when-cross-origin');secured.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');if(path==='/preview'||path.startsWith('/studio')){secured.headers.set('X-Robots-Tag','noindex, nofollow');secured.headers.set('Cache-Control','no-store');}return secured;
 }catch{return json({error:'Request could not be completed.'},500)}}};
