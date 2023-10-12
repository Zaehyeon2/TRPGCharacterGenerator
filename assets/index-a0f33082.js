import{j as T,H as F,U as R,L as G,G as g,T as i,r as v,a as k,B as D,C as P,F as L,N as S,S as K,b as C,c as x,d as l,e as E,f as y,g as H,h as M,M as I,A as O,R as $,i as A,k as q,l as U,m as _}from"./vendor-0bb92977.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const h of t.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&c(h)}).observe(document,{childList:!0,subtree:!0});function u(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerpolicy&&(t.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?t.credentials="include":s.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(s){if(s.ep)return;s.ep=!0;const t=u(s);fetch(s.href,t)}})();const W=T.Fragment,e=T.jsx,a=T.jsxs;const J="/TRPGCharacterGenerator/assets/dice20-07174400.png";function Q(){return e(F,{height:80,p:"md",children:e(R,{component:G,to:"/TRPGCharacterGenerator",children:a(g,{position:"center",mt:"md",children:[e("img",{src:J,alt:"dice20",width:26.6}),e(i,{size:"lg",children:"TRPG Character Generator"})]})})})}const B="/TRPGCharacterGenerator/assets/character-cf168b5a.svg",X="/TRPGCharacterGenerator/assets/chevron-c91aa4e2.svg",Y="/TRPGCharacterGenerator/assets/cthulhu-e4b4b7ad.svg",Z="/TRPGCharacterGenerator/assets/dungeon-gate-06f76814.svg";function ee({icon:d,color:r,label:u,links:c}){const[s,t]=v.useState(!1),h=c.map(n=>e(i,{size:"sm",component:G,to:n.link,align:"left",sx:o=>({paddingLeft:31,marginLeft:30,borderLeft:`1px solid ${o.colorScheme==="dark"?o.colors.dark[4]:o.colors.gray[3]}`,display:"block",padding:o.spacing.xs,borderRadius:o.radius.sm,color:o.colorScheme==="dark"?o.colors.dark[0]:o.black,"&:hover":{backgroundColor:o.colorScheme==="dark"?o.colors.dark[6]:o.colors.gray[0]}}),children:a(g,{children:[e(k,{color:r,variant:"light",children:n.icon}),n.label," "]})},n.label));return a(W,{children:[e(R,{component:G,to:"#",onClick:()=>t(n=>!n),sx:n=>({display:"block",width:"100%",padding:n.spacing.xs,borderRadius:n.radius.sm,color:n.colorScheme==="dark"?n.colors.dark[0]:n.black,"&:hover":{backgroundColor:n.colorScheme==="dark"?n.colors.dark[6]:n.colors.gray[0]}}),children:a(g,{position:"left",spacing:0,children:[e(D,{sx:n=>({display:"block",padding:n.spacing.xs,borderRadius:n.radius.sm,color:n.colorScheme==="dark"?n.colors.dark[0]:n.black,"&:hover":{backgroundColor:n.colorScheme==="dark"?n.colors.dark[6]:n.colors.gray[0]}}),children:a(g,{children:[e(k,{color:r,variant:"light",children:d}),e(i,{size:"sm",children:u})]})}),e(k,{color:r,variant:"light",sx:n=>({marginLeft:"auto",transform:s?`rotate(${n.dir==="rtl"?-90:90}deg)`:"none",transition:"transform 200ms ease"}),children:e("img",{src:X,alt:"chevron"})})]})}),e(P,{in:s,children:h})]})}const re=[{icon:e("img",{src:Y,alt:"cthulhu"}),color:"#000000",label:"Call of Cthulhu",links:[{icon:e("img",{src:B,alt:"character"}),label:"Character Generator",link:"/TRPGCharacterGenerator/coc/generator"}]},{icon:e("img",{src:Z,alt:"dungeonGate"}),color:"#000000",label:"Dungeon World",links:[{icon:e("img",{src:B,alt:"character"}),label:"Character Generator",link:"/TRPGCharacterGenerator/dw/generator"}]}];function ne(){const d=re.map(r=>v.createElement(ee,{...r,key:r.label}));return e("div",{children:d})}function ae(){return e(L,{height:{base:20,md:40},p:"md",children:e(g,{position:"left",children:a(i,{children:[e("a",{href:"https://www.freepik.com/free-vector/medieval-knight-with-weapon_30162714.htm#query=warrior%20svg&position=10&from_view=keyword&track=ais",children:"Image by brgfx"})," ","on Freepik"]})})})}function te(){return a(S,{width:{base:300},p:"xs",children:[e(S.Section,{grow:!0,mt:"md",component:K,children:e(ne,{})}),e(S.Section,{children:e(ae,{})})]})}function le(d,r){let u=0;for(let c=0;c<d;c+=1)u+=Math.floor(Math.random()*r)+1;return u}function N(d){const r=Number(d);return!Number.isNaN(r)||r>=0}function f({statKey:d,label:r,value:u,nDices:c,nSides:s,baseValue:t=0,maxValue:h,isClass:n=!1,multiplyValue:o=1,getAndSetFunction:m}){const[b,w]=v.useState({value:Math.min(h,u+t)*o,valueAddedBaseValue:Math.min(h,u+t)*o,valueDividedBy2:Math.floor(Math.min(h,u+t)*o/2),valueDividedBy5:Math.floor(Math.min(h,u+t)*o/5),isClassTraits:!1});function z(p){w({value:p,valueAddedBaseValue:p,valueDividedBy2:Math.floor(p/2),valueDividedBy5:Math.floor(p/5),isClassTraits:b.isClassTraits})}function V(){if(!c||!s)return;const p=le(c,s);z((p+t)*o),j((p+t)*o)}function j(p){m(d,p)}return e(C,{children:a(x,{align:"center",spacing:0,sx:{border:"1px solid",borderRadius:"0.5em"},children:[e(i,{align:"center",fz:"sm",children:r}),a(l,{justify:"center",align:"center",sx:{paddingTop:"5px",paddingBottom:"5px"},children:[n&&e(l.Col,{span:"content",children:e(E,{checked:b.isClassTraits,size:"xs",onChange:()=>{w({...b,isClassTraits:!b.isClassTraits})}})}),e(l.Col,{span:5,children:e(y,{autoComplete:"off",value:b.value,onChange:p=>{N(p.currentTarget.value)&&(z(+p.currentTarget.value),j(+p.currentTarget.value))}})}),e(l.Col,{span:4,children:a(l,{justify:"center",align:"center",children:[e(l.Col,{span:6,children:e(i,{fz:"xl",children:b.valueAddedBaseValue})}),e(l.Col,{span:5,children:a(x,{spacing:0,align:"center",children:[e(i,{fz:"xs",children:b.valueDividedBy2}),e(i,{fz:"xs",children:b.valueDividedBy5})]})})]})}),c&&s&&e(l.Col,{span:"content",children:e(R,{onClick:()=>V(),children:e("img",{src:"/src/assets/dice20.png",alt:"roll",width:"20px"})})})]})]})})}const ie=H(()=>({label:{width:"70px"}}));function se(){const{classes:d}=ie(),[r,u]=v.useState({age:0,str:0,dex:0,int:0,health:0,appeareance:0,mentality:0,size:0,education:0,mobility:0,luck:0});function c(t,h){u({...r,[t]:h})}function s(){const{str:t,dex:h,size:n,age:o}=r;let m;t<n&&h<n?m=7:t>n&&h>n?m=9:m=8,o>=80?m-=5:o>=70?m-=4:o>=60?m-=3:o>=50?m-=2:o>=40&&(m-=1),u({...r,mobility:m})}return v.useEffect(()=>{s()},[r.str,r.dex,r.size,r.age]),a(M,{withBorder:!0,radius:"md",children:[a(l,{justify:"center",align:"center",children:[e(l.Col,{span:4,children:a(x,{spacing:"xs",sx:{border:"solid",paddingBottom:"10px",height:"330px"},children:[e(i,{sx:{backgroundColor:"black",width:"100%"},children:"현대 탐사자"}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"이름"}),e(y,{size:"xs"})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"플레이어"}),e(y,{size:"xs"})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"직업"}),e(y,{value:r.job,size:"xs",onChange:t=>{u({...r,job:t.currentTarget.value})}})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"나이"}),e(y,{value:r.age,size:"xs",onChange:t=>{N(t.currentTarget.value)&&u({...r,age:+t.currentTarget.value})}})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"성별"}),e(y,{size:"xs"})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"거주지"}),e(y,{size:"xs"})]}),a(g,{sx:{margin:"auto"},children:[e(i,{className:d.label,children:"출생지"}),e(y,{size:"xs"})]})]})}),e(l.Col,{span:8,children:a(x,{justify:"space-between",spacing:"xs",sx:{paddingBottom:"10px",border:"solid",height:"330px"},children:[e(i,{sx:{backgroundColor:"brown"},children:"특성치"}),a(l,{justify:"center",align:"center",children:[e(l.Col,{span:4,children:e(f,{statKey:"str",value:r.str,label:"근력",nDices:3,nSides:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(f,{statKey:"dex",value:r.dex,label:"민첩성",nDices:3,nSides:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(f,{statKey:"int",value:r.int,label:"지능",nDices:2,nSides:6,baseValue:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})})]}),a(l,{justify:"center",align:"center",children:[e(l.Col,{span:4,children:e(f,{statKey:"health",value:r.health,label:"건강",nDices:3,nSides:6,baseValue:0,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(f,{statKey:"appeareance",value:r.appeareance,label:"외모",nDices:3,nSides:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(f,{statKey:"mentality",value:r.mentality,label:"정신력",nDices:3,nSides:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})})]}),a(l,{justify:"center",align:"center",children:[e(l.Col,{span:4,children:e(f,{statKey:"size",value:r.size,label:"크기",nDices:2,nSides:6,baseValue:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(f,{statKey:"education",value:r.education,label:"교육",nDices:2,nSides:6,baseValue:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:4,children:e(C,{children:a(x,{sx:{border:"1px solid",borderRadius:"0.5em"},justify:"center",children:[e(i,{children:"이동력"}),e(i,{children:r.mobility})]})})})]})]})})]}),e(x,{justify:"space-between",spacing:"xs",sx:{paddingBottom:"10px",paddingTop:"10px",border:"solid",marginTop:"16px"},children:a(l,{justify:"center",align:"center",children:[e(l.Col,{span:3,children:e(C,{children:a(x,{sx:{border:"1px solid",borderRadius:"0.5em"},justify:"center",children:[e(i,{children:"체력"}),e(i,{children:Math.floor((r.size+r.health)/10)})]})})}),e(l.Col,{span:3,children:e(f,{statKey:"luck",value:r.luck,label:"운",nDices:3,nSides:6,multiplyValue:5,maxValue:99,getAndSetFunction:c})}),e(l.Col,{span:3,children:e(C,{children:a(x,{sx:{border:"1px solid",borderRadius:"0.5em"},justify:"center",children:[e(i,{children:"이성"}),e(i,{children:r.mentality})]})})}),e(l.Col,{span:3,children:e(C,{children:a(x,{sx:{border:"1px solid",borderRadius:"0.5em"},justify:"center",children:[e(i,{children:"마력"}),e(i,{children:Math.floor(r.mentality/5)})]})})})]})})]})}function oe(){return e(M,{withBorder:!0,radius:"md",children:"Hello"})}function ce(){return e(I,{theme:{colorScheme:"dark"},withGlobalStyles:!0,withNormalizeCSS:!0,children:e(O,{padding:"md",navbar:e(te,{}),header:e(Q,{}),children:a($,{children:[e(A,{path:"/TRPGCharacterGenerator",element:e(oe,{})}),e(A,{path:"/TRPGCharacterGenerator/coc/generator",element:e(se,{})})]})})})}q.createRoot(document.getElementById("root")).render(e(U.StrictMode,{children:e(_,{children:e(ce,{})})}));
