if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bw3lV3EI.js",revision:null},{url:"assets/index-C8RxMRFb.css",revision:null},{url:"index.html",revision:"4568750a7db3f7a4429d79ccb175ab28"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"logo-v1.svg",revision:"1e22f33bb5491bdc26c3013762523b8c"},{url:"manifest.webmanifest",revision:"e3a22c9a867dd4bf64503d5d9266607d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
