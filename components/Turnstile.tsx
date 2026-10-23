'use client';
import {useEffect,useRef} from 'react';
declare global {interface Window {turnstile?:{render:(el:HTMLElement,options:{sitekey:string;callback:(token:string)=>void})=>string;remove:(id:string)=>void}}}
export default function Turnstile({onToken}:{onToken:(token:string)=>void}){
 const host=useRef<HTMLDivElement>(null),callback=useRef(onToken);callback.current=onToken;
 useEffect(()=>{let cancelled=false,id:string|undefined;async function initialise(){const response=await fetch('/api/form-status/');if(!response.ok)return;const config=await response.json();if(!config.enabled||!config.siteKey)return;if(!window.turnstile){await new Promise<void>((resolve,reject)=>{const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.onload=()=>resolve();script.onerror=()=>reject();document.head.appendChild(script);});}if(!cancelled&&host.current&&window.turnstile)id=window.turnstile.render(host.current,{sitekey:config.siteKey,callback:token=>callback.current(token)});}initialise().catch(()=>callback.current(''));return()=>{cancelled=true;if(id&&window.turnstile)window.turnstile.remove(id);};},[]);
 return <div ref={host} className="turnstile"/>;
}
