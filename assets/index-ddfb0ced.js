import{j as C,r as S,T as h,L as y,G as f,a as b,U as x,B as L,C as T,F as N,H as P,N as m,S as j,b as G,c as l,d as A,e as B,M as D,A as F,R as E,f as k,g as I,h as O,i as V}from"./vendor-73e9387a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const z=C.Fragment,e=C.jsx,i=C.jsxs;const w="/TRPGCharacterGenerator/assets/character-cf168b5a.svg",H="/TRPGCharacterGenerator/assets/chevron-c91aa4e2.svg",$="/TRPGCharacterGenerator/assets/cthulhu-e4b4b7ad.svg",q="/TRPGCharacterGenerator/assets/dungeon-gate-06f76814.svg";function U({icon:u,color:o,label:s,links:c}){const[n,a]=S.useState(!1),d=c.map(r=>e(h,{size:"sm",component:y,to:r.link,align:"left",sx:t=>({paddingLeft:31,marginLeft:30,borderLeft:`1px solid ${t.colorScheme==="dark"?t.colors.dark[4]:t.colors.gray[3]}`,display:"block",padding:t.spacing.xs,borderRadius:t.radius.sm,color:t.colorScheme==="dark"?t.colors.dark[0]:t.black,"&:hover":{backgroundColor:t.colorScheme==="dark"?t.colors.dark[6]:t.colors.gray[0]}}),children:i(f,{children:[e(b,{color:o,variant:"light",children:r.icon}),r.label," "]})},r.label));return i(z,{children:[e(x,{component:y,to:"#",onClick:()=>a(r=>!r),sx:r=>({display:"block",width:"100%",padding:r.spacing.xs,borderRadius:r.radius.sm,color:r.colorScheme==="dark"?r.colors.dark[0]:r.black,"&:hover":{backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.colors.gray[0]}}),children:i(f,{position:"left",spacing:0,children:[e(L,{sx:r=>({display:"block",padding:r.spacing.xs,borderRadius:r.radius.sm,color:r.colorScheme==="dark"?r.colors.dark[0]:r.black,"&:hover":{backgroundColor:r.colorScheme==="dark"?r.colors.dark[6]:r.colors.gray[0]}}),children:i(f,{children:[e(b,{color:o,variant:"light",children:u}),e(h,{size:"sm",children:s})]})}),e(b,{color:o,variant:"light",sx:r=>({marginLeft:"auto",transform:n?`rotate(${r.dir==="rtl"?-90:90}deg)`:"none",transition:"transform 200ms ease"}),children:e("img",{src:H,alt:"chevron"})})]})}),e(T,{in:n,children:d})]})}const _=[{icon:e("img",{src:$,alt:"cthulhu"}),color:"#000000",label:"Call of Cthulhu",links:[{icon:e("img",{src:w,alt:"character"}),label:"Character Generator",link:"/coc/generator"}]},{icon:e("img",{src:q,alt:"dungeonGate"}),color:"#000000",label:"Dungeon World",links:[{icon:e("img",{src:w,alt:"character"}),label:"Character Generator",link:"/dw/generator"}]}];function K(){const u=_.map(o=>S.createElement(U,{...o,key:o.label}));return e("div",{children:u})}function W(){return e(N,{height:{base:20,md:40},p:"md",children:e(f,{position:"left",children:i(h,{children:[e("a",{href:"https://www.freepik.com/free-vector/medieval-knight-with-weapon_30162714.htm#query=warrior%20svg&position=10&from_view=keyword&track=ais",children:"Image by brgfx"})," ","on Freepik"]})})})}const J="/TRPGCharacterGenerator/assets/dice20-07174400.png";function Q(){return e(P,{height:80,p:"md",children:e(x,{component:y,to:"/",children:i(f,{position:"center",mt:"md",children:[e("img",{src:J,alt:"dice20",width:26.6}),e(h,{size:"lg",children:"TRPG Character Generator"})]})})})}function X(){return i(m,{width:{base:400,maximum:1100},p:"xs",children:[e(m.Section,{children:e(Q,{})}),e(m.Section,{grow:!0,mt:"md",component:j,children:e(K,{})}),e(m.Section,{children:e(W,{})})]})}function Y(u,o){let s=0;for(let c=0;c<u;c+=1)s+=Math.floor(Math.random()*o)+1;return s}function v({label:u,value:o,nDices:s,nSides:c,baseValue:n=0,maxValue:a}){const[d,r]=S.useState({value:o,valueAddedBaseValue:Math.min(a,o+n),valueDividedBy2:Math.floor(Math.min(a,o+n)/2),valueDividedBy5:Math.floor(Math.min(a,o+n)/5)});function t(g){const p=Math.min(a,g+n);r({value:g,valueAddedBaseValue:p,valueDividedBy2:Math.floor(p/2),valueDividedBy5:Math.floor(p/5)})}function M(){if(!s||!c)return;const g=Y(s,c);t(g)}return i(G,{align:"center",spacing:0,sx:{border:"2px solid",borderRadius:"1em"},children:[e(h,{align:"center",children:u}),i(l,{justify:"center",align:"center",sx:{padding:"5px"},children:[e(l.Col,{span:5,children:e(A,{value:d.value,onChange:g=>{const p=Number(g.currentTarget.value);Number.isNaN(p)||p<0||t(p)}})}),e(l.Col,{span:4,children:i(l,{justify:"center",align:"center",children:[e(l.Col,{span:6,children:e(h,{children:d.valueAddedBaseValue})}),e(l.Col,{span:6,children:i(G,{spacing:0,align:"center",children:[e(h,{children:d.valueDividedBy2}),e(h,{children:d.valueDividedBy5})]})})]})}),s&&c&&e(l.Col,{span:3,children:e(x,{onClick:()=>M(),children:e("img",{src:"/src/assets/dice20.png",alt:"roll",width:"20px"})})})]})]})}function Z(){return e(B,{withBorder:!0,radius:"md",children:i(l,{justify:"center",align:"center",children:[e(l.Col,{span:3,children:e(v,{value:10,nDices:1,nSides:100,maxValue:90})}),e(l.Col,{span:3,children:e(v,{value:10,label:"건강",baseValue:10,maxValue:90})}),e(l.Col,{span:3,children:e(v,{value:10,label:"건강",nDices:1,nSides:100,maxValue:90})}),e(l.Col,{span:3,children:e(v,{value:10,label:"건강",nDices:1,nSides:100,maxValue:90})})]})})}function R(){return e(B,{withBorder:!0,radius:"md",children:"Hello"})}function ee(){return e(D,{theme:{colorScheme:"dark"},withGlobalStyles:!0,withNormalizeCSS:!0,children:e(F,{padding:"md",navbar:e(X,{}),children:i(E,{children:[e(k,{path:"/",element:e(R,{})}),e(k,{path:"/TRPGCharacterGenerator",element:e(R,{})}),e(k,{path:"/coc/generator",element:e(Z,{})})]})})})}I.createRoot(document.getElementById("root")).render(e(O.StrictMode,{children:e(V,{children:e(ee,{})})}));