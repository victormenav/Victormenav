/* ---------- static i18n (ES is read from the page) ---------- */
const EN={
about_h:"About me",skills_h:"Skills",work_h:"Projects",
work_lead:"Projects I led end to end: the challenge, how I solved it and the business result.",
exp_h:"Experience",certs_h:"Continuous learning",nav_contact:"Contact",
contact_lead:"Regional technology leadership. If you need someone to keep your operation running and take it further with AI, write to me or message me on WhatsApp.",
copy:"Copy",cv:"Download PDF ↓",top:"Back to top ↑"};
const ES={};document.querySelectorAll('[data-i18n]').forEach(el=>{ES[el.dataset.i18n]=el.innerHTML});
let LANG='es';
const T=(es,en)=>LANG==='en'?en:es;

/* ---------- nav ---------- */
const NAV=[["sobre","Sobre mí","About"],["habilidades","Habilidades","Skills"],["proyectos","Proyectos","Projects"],["trayectoria","Experiencia","Experience"],["recomendaciones","Recomendaciones","Recommendations"],["certificaciones","Aprendizaje","Learning"],["contacto","Contacto","Contact"]];
let navActive=null;
function renderNav(){
  document.getElementById('navLinks').innerHTML='<span class="ind" id="ind" aria-hidden="true"></span>'+NAV.map(n=>`<a href="#${n[0]}" data-id="${n[0]}">${T(n[1],n[2])}</a>`).join('');
  document.getElementById('mnav').innerHTML=NAV.map(n=>`<li><a href="#${n[0]}">${T(n[1],n[2])}</a></li>`).join('');
  document.getElementById('menuTxt').textContent=T('Menú','Menu');document.getElementById('ovClose').textContent=T('Cerrar','Close');
  document.getElementById('ov').setAttribute('aria-label',T('Menú','Menu'));
  navActive=null;onNavScroll();
}
function moveInd(id){
  const ind=document.getElementById('ind');if(!ind)return;
  document.querySelectorAll('#navLinks a').forEach(a=>a.setAttribute('aria-current',String(a.dataset.id===id)));
  const a=id&&document.querySelector(`#navLinks a[data-id="${id}"]`);
  if(!a){ind.style.opacity='0';return}
  ind.style.width=a.offsetWidth+'px';ind.style.transform=`translateX(${a.offsetLeft}px)`;ind.style.opacity='1';
}
function onNavScroll(){
  const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('progress').style.transform=`scaleX(${max>0?Math.min(1,y/max):0})`;
  document.getElementById('topbar').classList.toggle('scrolled',y>40);
  let cur=null;for(const n of NAV){const el=document.getElementById(n[0]);if(el&&el.getBoundingClientRect().top<innerHeight*.4)cur=n[0]}
  if(cur!==navActive){navActive=cur;moveInd(cur)}
}
addEventListener('scroll',()=>requestAnimationFrame(onNavScroll),{passive:true});
addEventListener('resize',()=>{navActive=null;onNavScroll()});
const menuBtn=document.getElementById('menuBtn'),ov=document.getElementById('ov');
function setMenu(open){ov.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)document.getElementById('ovClose').focus();else menuBtn.focus()}
menuBtn.addEventListener('click',()=>setMenu(true));
document.getElementById('ovClose').addEventListener('click',()=>setMenu(false));
ov.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)setMenu(false)});

/* ---------- skills: periodic table ---------- */
const FAM={
 infra:["var(--t-warn)","Infraestructura","Infrastructure"],
 ops:["var(--t-logic)","Operaciones TI","IT operations"],
 cont:["var(--t-data)","Continuidad y riesgo","Continuity & risk"],
 mgmt:["var(--t-trig)","Gestión y proyectos","Management & projects"],
 ai:["var(--t-ai)","IA generativa","Generative AI"],
 dev:["var(--t-out)","Sistemas y desarrollo","Systems & development"]};
/* [sym, name es, name en, family, where es, where en] */
const SK=[
["Ws","Windows Server","Windows Server","infra","Hotel Presidente: servidores críticos de la operación","Hotel Presidente: business-critical servers"],
["Ad","Active Directory","Active Directory","infra","Hotel Presidente: identidad y accesos","Hotel Presidente: identity and access"],
["Fw","Firewalls","Firewalls","infra","Hotel Presidente y estaciones de Volaris","Hotel Presidente and Volaris stations"],
["Sv","Servidores críticos","Critical servers","infra","Administración en operación 24/7","Run in a 24/7 operation"],
["Rd","Diseño de redes","Network design","infra","Redes de dos propiedades hoteleras (Casa Conde)","Networks for two hotel properties (Casa Conde)"],
["Mp","Red MPLS","MPLS network","infra","Volaris Perú: red MPLS Gigabit con Italtel","Volaris Peru: MPLS Gigabit network with Italtel"],
["It","ITIL","ITIL","ops","Gestión de servicios TI en Volaris","IT service management at Volaris"],
["Ae","Soporte aeroportuario","Airport support","ops","Estaciones de Volaris en 7 países","Volaris stations across 7 countries"],
["24","Operación 24/7","24/7 operations","ops","Hotel Presidente y aviación","Hotel Presidente and aviation"],
["Mo","MOIT · WSSRA","MOIT · WSSRA","ops","Modelo de modernización en Hotel Presidente","Modernisation model at Hotel Presidente"],
["Op","MICROS Opera","MICROS Opera","ops","Migración desde Fidelio sin detener el hotel","Migration from Fidelio without stopping the hotel"],
["Fi","Fidelio","Fidelio","ops","Sistema hotelero de origen de la migración","Source hotel system of the migration"],
["Bc","BCP","BCP","cont","Planes de continuidad del negocio","Business continuity planning"],
["Bi","BIA","BIA","cont","Análisis de impacto al negocio","Business impact analysis"],
["Rk","Gestión de riesgos","Risk management","cont","Equilibrio entre riesgo, proveedores y presupuesto","Balancing risk, vendors and budget"],
["Dg","Certificación DGAC","DGAC certification","cont","Volaris Costa Rica ante la Aviación Civil","Volaris Costa Rica with Civil Aviation"],
["Pr","Proyectos regionales","Regional projects","mgmt","Lanzamientos en Centroamérica, Sudamérica y EE. UU.","Launches in Central America, South America and the US"],
["Sc","Scrum","Scrum","mgmt","Scrum Fundamentals Certified (2026)","Scrum Fundamentals Certified (2026)"],
["Ji","Jira","Jira","mgmt","Seguimiento de proyectos","Project tracking"],
["Tr","Trello","Trello","mgmt","Seguimiento de tareas","Task tracking"],
["Pv","Proveedores","Vendor management","mgmt","Coordinación regional de proveedores","Regional vendor coordination"],
["Cx","CAPEX / OPEX","CAPEX / OPEX","mgmt","Presupuestos de tecnología","Technology budgets"],
["Td","Transformación digital","Digital transformation","mgmt","Habilitación tecnológica de operaciones","Technology enablement of operations"],
["Cl","Claude","Claude","ai","Cursos y uso diario","Courses and daily use"],
["Gp","ChatGPT","ChatGPT","ai","Cursos y uso diario","Courses and daily use"],
["Ia","IA generativa","Generative AI","ai","Formación y capacitación","Training and enablement"],
["Ge","IA para gestión","AI for management","ai","Máster en EUDE Business School (2026)","Master's at EUDE Business School (2026)"],
["Fx","FoxPro","FoxPro","dev","Sistemas internos en Corporación Surá","Internal systems at Corporación Surá"],
["Vf","Visual FoxPro","Visual FoxPro","dev","Contabilidad, planillas, presupuesto, RR. HH. y bodega","Accounting, payroll, budget, HR and warehouse"],
["Ie","Ingeniería informática","Computer engineering","dev","Bachillerato, Universidad Metropolitana Castro Carazo","B.Sc., Universidad Metropolitana Castro Carazo"]];
let skSel=SK.findIndex(s=>s[0]==='Dg');
function renderSkills(){
  document.getElementById('skillsLead').textContent=T(`${SK.length} elementos de mi trayectoria, agrupados en 6 familias. Pulsa uno para ver dónde lo he usado.`,`${SK.length} elements from my career, grouped in 6 families. Tap one to see where I used it.`);
  document.getElementById('legend').innerHTML=Object.values(FAM).map(f=>`<span><i style="background:${f[0]}"></i>${T(f[1],f[2])}</span>`).join('');
  document.getElementById('ptable').innerHTML=SK.map((s,i)=>`<button type="button" class="el" style="--c:${FAM[s[3]][0]}" aria-pressed="${i===skSel}" data-i="${i}"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="s">${s[0]}</span><span class="nm">${T(s[1],s[2])}</span></button>`).join('');
  document.querySelectorAll('#ptable .el').forEach(b=>b.addEventListener('click',()=>select(+b.dataset.i)));
  renderInspect();
}
function select(i){skSel=i;document.querySelectorAll('#ptable .el').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));renderInspect()}
function renderInspect(){
  const s=SK[skSel],f=FAM[s[3]],el=document.getElementById('inspect');
  el.style.setProperty('--c',f[0]);
  el.innerHTML=`<span class="lbl">${T('Inspeccionar','Inspect')} · ${skSel+1}</span><div class="big">${s[0]}</div><h4>${T(s[1],s[2])}</h4><dl><dt>${T('Familia','Family')}</dt><dd>${T(f[1],f[2])}</dd><dt>${T('Dónde lo he usado','Where I used it')}</dt><dd>${T(s[4],s[5])}</dd></dl>`;
}

/* ---------- projects ---------- */
const FC={infra:"var(--t-warn)",ops:"var(--t-logic)",cont:"var(--t-data)",mgmt:"var(--t-trig)",ai:"var(--t-ai)",dev:"var(--t-out)"};
const tag=(f,t)=>`<span style="--c:${FC[f]}">${t}</span>`;
const flow=(arr,hot)=>`<div class="sk-flow">`+arr.map((a,i)=>(i?'<span class="sk-arrow">→</span>':'')+`<span class="sk-node${i===hot?' hot':''}">${a}</span>`).join('')+`</div>`;
function renderProjects(){
  const IATA=['IAD','MEX','GUA','SAL','SAP','SJO','LIM'];
  const routeDots=Array.from({length:7},(_,i)=>{const x=22+i*(256/6),y=54+Math.sin(i*1.2)*18;return [x,y]});
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const plane=`<g class="plane"><path transform="scale(1.45)" stroke="var(--surface)" stroke-width="1.6" paint-order="stroke" stroke-linejoin="round" d="M9 0 3 -1.3 -1 -7.5H-3.2L-0.6 -1.3H-5.2L-7.2 -3.8H-8.8L-7.5 0 -8.8 3.8H-7.2L-5.2 1.3H-0.6L-3.2 7.5H-1L3 1.3Z" fill="var(--ink)"/>${still?'':`<animateMotion dur="8s" repeatCount="indefinite" rotate="auto" calcMode="linear"><mpath href="#rtPath"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.06;.94;1" dur="8s" repeatCount="indefinite"/>`}</g>`;
  const rd='M'+routeDots.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L');
  const P=[
   {n:"01",t:T('Certificación de la Aerolínea ante la DGAC de Costa Rica<span class="p-sub">Obteniendo el AOC (Air Operator\'s Certificate)</span>','Airline certification with Costa Rica\'s DGAC<span class="p-sub">Obtaining the AOC (Air Operator\'s Certificate)</span>'),
    c:T('Volaris · Costa Rica · Aviación Civil','Volaris · Costa Rica · Civil Aviation'),
    b:[T('Parte del equipo que certificó a la aerolínea ante la DGAC de Costa Rica.','Part of the team that certified the airline with Costa Rica\'s DGAC.'),
       T('Habilitación de la infraestructura y los sistemas TI de la operación.','Enabled the IT infrastructure and systems of the operation.'),
       T('Coordinación con proveedores, equipos locales y la casa matriz.','Coordination with vendors, local teams and headquarters.')],
    tags:[['cont','DGAC'],['ops','ITIL'],['infra',T('Infraestructura','Infrastructure')],['mgmt',T('Proveedores','Vendors')]],
    win:T('certificación / dgac','certification / dgac'),
    sk:`<div class="bp" id="bp"><div class="bp-m"><div class="bp-hd"><span>VOLARIS · Q6</span><span class="bp-fl">${T('VUELO','FLIGHT')} Q6&nbsp;4065<svg class="bp-flag" viewBox="0 0 10 6" width="20" height="12" role="img" aria-label="Costa Rica"><rect width="10" height="6" fill="#002b7f"/><rect y="1" width="10" height="4" fill="#fff"/><rect y="2" width="10" height="2" fill="#ce1126"/></svg></span></div>
      <div class="bp-rt">SJO<span class="bp-pl">✈</span>GUA<small>${T('Operación<br>Costa&nbsp;Rica','Operations<br>Costa&nbsp;Rica')}</small></div>
      <div class="bp-ln">${T('Infraestructura · Sistemas · Redes · Seguridad','Infrastructure · Systems · Networks · Security')}</div>
      <span class="bp-st"><span class="bp-rev">${T('Revisando','Reviewing')}<i>.</i><i>.</i><i>.</i></span><span class="bp-ok">${T('APROBADO','APPROVED')}</span></span></div>
      <div class="bp-s"><div class="bp-lb">${T('ESTADO','STATUS')}</div><div class="bp-sv"><span class="bp-rev">${T('En revisión','In review')}</span><span class="bp-ok">${T('Aprobado','Approved')}</span></div><i class="bp-hole"></i><div class="bp-bc"></div></div></div>
      <div class="sk-metric"><b>DGAC</b><span>${T('Aerolínea Costarricense Certificada para operar desde Costa Rica','Costa Rican airline certified to operate from Costa Rica')}</span></div>`},
   {n:"02",t:T('Aperturas en TI en Aeropuertos de 7 países','IT openings across 7 countries'),
    c:T('Volaris · Centroamérica, Sudamérica y EE. UU. · 2016 – 2026','Volaris · Central America, South America and the US · 2016 – 2026'),
    b:[T('Liderazgo y soporte TI para más de 180 usuarios corporativos y estaciones aeroportuarias.','IT leadership and support for 180+ corporate users and airport stations.'),
       T('Aperturas tecnológicas de nuevas operaciones en la región.','Technology launches for new operations across the region.'),
       T('Migración de la estación al aeropuerto Jorge Chávez de Lima.','Station migration to Lima\'s Jorge Chávez airport.')],
    tags:[['mgmt',T('Proyectos regionales','Regional projects')],['ops',T('Soporte aeroportuario','Airport support')],['infra','MPLS']],
    win:T('región / 7 países','region / 7 countries'),
    sk:`<div class="sk-map"><svg viewBox="0 0 300 96" aria-hidden="true"><path id="rtPath" d="${rd}" fill="none" stroke="var(--signal)" stroke-width="2.5" stroke-dasharray="7 6"><animate attributeName="stroke-dashoffset" from="26" to="0" dur="1.4s" repeatCount="indefinite"/></path>${routeDots.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${i===0||i===6?6:4.5}" fill="${i===0||i===6?'var(--signal)':'var(--surface)'}" stroke="var(--ink)" stroke-width="1.5"/><text x="${p[0].toFixed(1)}" y="${(p[1]<54?p[1]-12:p[1]+20).toFixed(1)}" text-anchor="middle" class="iata${i===0||i===6?' hub':''}">${IATA[i]}</text>`).join('')}${plane}</svg></div><div class="sk-metric"><span class="sk-num"><b>180+</b><svg class="sk-user" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4.2"/><path d="M3.5 21c0-4.6 3.8-7.6 8.5-7.6s8.5 3 8.5 7.6z"/></svg></span><span>${T('Usuarios Corporativos y estaciones Aeroportuarias con Soporte','corporate users and airport stations supported')}</span></div>`},
   {n:"03",t:T('Modernización de Hotel Presidente','Modernising Hotel Presidente'),
    c:T('IT Manager · 2005 – 2016','IT Manager · 2005 – 2016'),
    b:[T('Infraestructura modernizada con el modelo MOIT, basado en Microsoft WSSRA.','Infrastructure modernised with the MOIT model, based on Microsoft WSSRA.'),
       T('Windows Server, Active Directory, firewalls y servidores críticos.','Windows Server, Active Directory, firewalls and critical servers.'),
       T('Migración de Fidelio a MICROS Opera manteniendo la operación 24/7.','Migrated Fidelio to MICROS Opera while keeping 24/7 operations.')],
    tags:[['ops','MICROS Opera'],['ops','MOIT'],['infra','Windows Server'],['infra','Active Directory']],
    win:T('hotel / migración','hotel / migration'),
    sk:`<div class="mig" id="mig"><div class="mig-row"><span class="srv mig-src"><span class="srv-box"><i></i><i></i><i></i></span><b>Fidelio</b></span><span class="mig-track"><i></i><i></i><i></i></span><span class="srv mig-dst"><span class="srv-box"><i></i><i></i><i></i></span><b>MICROS Opera</b></span></div>
      <div class="mig-prog"><div class="mig-bar"><b></b></div><small><span class="mig-item">${T('Migrando','Migrating')}…</span><span class="mig-pct">0%</span></small></div>
      <div class="sk-metric"><b>24/7</b><span><em class="live"></em>${T('Migración EXITOSA sin afectación operativa','the hotel kept running during the whole migration')}</span></div></div>`},
   {n:"04",t:T('Sistemas internos y redes hoteleras','Internal systems and hotel networks'),
    c:T('Corporación Surá & Grupo Hotelero Casa Conde · 1997 – 2005','Corporación Surá & Grupo Hotelero Casa Conde · 1997 – 2005'),
    b:[T('Desarrollo de los sistemas de contabilidad, planillas, presupuesto, RR. HH. y bodega.','Built the accounting, payroll, budget, HR and warehouse systems.'),
       T('Programados en FoxPro y Visual FoxPro.','Written in FoxPro and Visual FoxPro.'),
       T('Diseño de redes para dos propiedades hoteleras.','Designed networks for two hotel properties.')],
    tags:[['dev','FoxPro'],['dev','Visual FoxPro'],['infra',T('Redes','Networks')]],
    win:T('sistemas / módulos','systems / modules'),
    sk:`<div class="code" id="code"><div class="code-scr"></div><div class="sk-metric"><b class="code-n">0</b><span>${T('Sistemas Internos desarrollados a medida <br>en Visual FoxPro','custom internal systems built in Visual FoxPro')}</span></div></div>`}
  ];
  document.getElementById('projects').innerHTML=P.map(p=>`<article class="pcard">
    <div><span class="pnum">${p.n}</span><h3>${p.t}</h3><p class="pctx">${p.c}</p><ul>${p.b.map(x=>`<li>${x}</li>`).join('')}</ul><div class="ptags">${p.tags.map(x=>tag(x[0],x[1])).join('')}</div></div>
    <div class="sketch" aria-hidden="true"><div class="sk-bar"><i></i><i></i><i></i><span>${p.win}</span></div><div class="sk-body">${p.sk}</div></div>
  </article>`).join('');
  initMig();initCode();initBP();
}
function initBP(){
  const b=document.getElementById('bp');if(!b)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){b.classList.add('ok');return}
  let tm=0,vis=false;
  const cycle=()=>{b.classList.remove('ok');tm=setTimeout(()=>{b.classList.add('ok');tm=setTimeout(cycle,3200)},3000)};
  new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v===vis)return;vis=v;clearTimeout(tm);if(v)cycle();else b.classList.remove('ok')},{threshold:.4}).observe(b);
}
function initCode(){
  const c=document.getElementById('code');if(!c)return;
  const scr=c.querySelector('.code-scr'),num=c.querySelector('.code-n');
  const SN=[['* contabilidad.prg','USE asientos SHARED','SUM debe-haber TO nSaldo','REPORT FORM balance PREVIEW'],
    ['* planillas.prg','SCAN FOR activo','  REPLACE neto WITH bruto-ccss','ENDSCAN'],
    ['* bodega.prg','SELECT * FROM inventario ;','  WHERE stock < minimo','DO FORM pedido']];
  const MODS=['contabilidad','planillas','presupuesto','rrhh','bodega'];
  const esc=x=>x.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const hl=x=>x.startsWith('*')?`<span class="c-cm">${esc(x)}</span>`:esc(x).replace(/\b(USE|SHARED|SUM|TO|REPORT|FORM|PREVIEW|SCAN|FOR|REPLACE|WITH|ENDSCAN|SELECT|FROM|WHERE|DO)\b/g,'<span class="c-kw">$1</span>');
  const blt=(m,st)=>`<span class="c-pr">&gt;</span> build ${m}.exe ${st==2?'<span class="c-ok">✓</span>':'<span class="c-dim">'+'.'.repeat(st?3:1)+'</span>'}`;
  let lines=[];const draw=cur=>{scr.innerHTML=lines.concat(cur!=null?[cur+'<i class="c-cur"></i>']:[]).map(l=>`<div>${l||'&nbsp;'}</div>`).join('')};
  const final=k=>{lines=SN[k].map(hl).concat(MODS.map(m=>blt(m,2)));num.textContent='5';draw('')};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){final(0);return}
  let run=0,vis=false,loop=0;const wait=ms=>new Promise(r=>setTimeout(r,ms));
  async function play(id){
    while(id===run){
      const sn=SN[loop++%SN.length];lines=[];num.textContent='0';draw('');
      for(const L of sn){for(let k=1;k<=L.length;k++){if(id!==run)return;draw(hl(L.slice(0,k)));await wait(28)}lines.push(hl(L));draw('');await wait(160)}
      await wait(250);
      for(let m=0;m<MODS.length;m++){for(const st of [0,1]){if(id!==run)return;draw(blt(MODS[m],st));await wait(170)}lines.push(blt(MODS[m],2));num.textContent=String(m+1);draw('')}
      await wait(2800);
    }
  }
  final(0);
  new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v===vis)return;vis=v;run++;if(v)play(run)},{threshold:.4}).observe(c);
}
function initMig(){
  const m=document.getElementById('mig');if(!m)return;
  const bar=m.querySelector('.mig-bar b'),pct=m.querySelector('.mig-pct'),item=m.querySelector('.mig-item');
  const ITEMS=[T('Reservas','Reservations'),T('Huéspedes','Guests'),T('Folios','Folios'),T('Tarifas','Rates'),T('Habitaciones','Rooms')];
  const set=p=>{m.style.setProperty('--p',p);bar.style.width=(p*100)+'%';pct.textContent=Math.round(p*100)+'%';
    if(p>=1){m.classList.add('done');item.textContent='✓ '+T('Migración completa','Migration complete')}
    else{m.classList.remove('done');item.textContent=T('Migrando','Migrating')+' · '+ITEMS[Math.min(ITEMS.length-1,Math.floor(p*ITEMS.length))]}};
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){set(1);return}
  const RUN=5200,HOLD=2600;let t0=0,raf=0,vis=false;
  const tick=now=>{if(!t0)t0=now;const e=(now-t0)%(RUN+HOLD);set(Math.min(1,e/RUN));raf=requestAnimationFrame(tick)};
  set(0);
  new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v===vis)return;vis=v;m.classList.toggle('run',v);
    if(v){t0=0;raf=requestAnimationFrame(tick)}else cancelAnimationFrame(raf)},{threshold:.4}).observe(m);
}

/* ---------- experience timeline ---------- */
function renderTimeline(){
  const X=["var(--route)",T('Experiencia','Experience')],F=["var(--t-data)",T('Formación','Education')];
  /* [year, kind, dates, title, org, bullets, key, cta] */
  const EXP=[
   ["1997",X,"1997 – 2005",T('Gerente de Cómputo','Computer Manager'),"Corporación Surá & Grupo Hotelero Casa Conde",
    [T('Sistemas de contabilidad, planillas, presupuesto, RR. HH. y bodega.','Accounting, payroll, budget, HR and warehouse systems.'),T('Diseño de redes para dos hoteles.','Network design for two hotels.')]],
   ["2005",F,"2005",T('Bachillerato en Ingeniería Informática','B.Sc. in Computer Engineering'),"Universidad Metropolitana Castro Carazo",
    [T('Base técnica de toda mi trayectoria.','The technical foundation of my career.')]],
   ["2005",X,"2005 – 2016","IT Manager","Hotel Presidente · San José",
    [T('Modernización con el modelo MOIT (Microsoft WSSRA).','Modernisation with the MOIT model (Microsoft WSSRA).'),T('Migración de Fidelio a MICROS Opera en operación 24/7.','Fidelio to MICROS Opera migration in a 24/7 operation.')]],
   ["2007",F,"2007 – 2008","Cisco Networking Academy · CCNA","Universidad de Costa Rica",
    [T('CCNA Módulos I, II, III y IV.','CCNA Modules I, II, III & IV.'),T('Redes, enrutamiento y conmutación.','Networking, routing and switching.')]],
   ["2014",F,"2014",T('Gerencia y Liderazgo','Management & Leadership'),"INCAE Business School",
    [T('Programa de gestión y liderazgo.','Management and leadership programme.')]],
   ["2016",X,"2016 – 2026",T('Especialista TI para Centro y Sudamérica','IT Specialist, Central & South America'),"Volaris Airlines",
    [T('Liderazgo TI en 7 países, 180+ usuarios y estaciones.','IT leadership in 7 countries, 180+ users and stations.'),T('Certificación ante la DGAC de Costa Rica.','Certification with Costa Rica\'s DGAC.'),T('Migración al aeropuerto Jorge Chávez de Lima.','Migration to Lima\'s Jorge Chávez airport.')],true],
   ["2026",F,"2026",T('Máster en IA para la Gestión Empresarial','Master\'s in AI for Business Management'),"EUDE Business School · España",
    [T('IA generativa aplicada a la gestión.','Generative AI applied to management.'),T('Scrum Fundamentals Certified (SFC).','Scrum Fundamentals Certified (SFC).')],true,false],
   [T('Hoy','Today'),F,'',T('Actualmente cursando','Currently studying'),'',
    [T('Máster en IA para la Gestión Empresarial - España','Master\'s in AI for Business Management - Spain'),'Cloud Computing Foundations - Google',T('Formación en Claude y ChatGPT','Training in Claude and ChatGPT'),T('Inglés','English')],true,false],
   [T('Hoy','Today'),X,'',T('Mi siguiente paso','My next step'),'',
    [T('En busca de un nuevo <u>RETO</u> profesional.','Looking for a new professional <u>CHALLENGE</u>.')],true,true]];
  const LOGOS=[[/Volaris/,'volaris.png','Volaris',40],[/Hotel Presidente/,'hotel-presidente.png','Hotel Presidente',71],[/Casa Conde/,'casa-conde.png','Grupo Hotelero Casa Conde',49],
   [/Castro Carazo/,'umca.png','Universidad Metropolitana Castro Carazo',42],[/Universidad de Costa Rica/,'ucr.png','Universidad de Costa Rica',38],[/INCAE/,'incae.png','INCAE Business School',42],[/EUDE/,'eude.png','EUDE Business School',82]];
  const tlLogo=org=>{const l=LOGOS.find(x=>x[0].test(org));return l?`<img class="tl-logo${l[3]>60?' wide':''}" src="assets/${l[1]}" alt="${l[2]}" width="${l[3]}" height="40" loading="lazy" style="width:${l[3]}px">`:''};
  EXP.reverse(); /* más reciente arriba; el spine va primero para que Experiencia quede a la derecha y Formación a la izquierda */
  document.getElementById('timeline').innerHTML='<span class="spine" aria-hidden="true"></span>'+EXP.map(it=>`<li data-year="${it[0]}" class="${it[1]===F?'edu':'exp'}${it[6]?' key':''}${it[2]===''?' hoy':''}"><div class="entry">${tlLogo(it[4])}
     ${it[2]?`<span class="kind" style="--c:${it[1][0]}">${it[1][1]}</span><span class="dates">${it[2]}</span>`:''}
     <h3>${it[3]}</h3>${it[4]?`<div class="org">${it[4]}</div>`:''}<ul${it[7]?' class="radar"':''}>${it[5].map(b=>`<li>${b}</li>`).join('')}</ul>
     ${it[7]?`<a class="cta-link" href="#contacto">${T('Hablemos ↗','Let\'s talk ↗')}</a>`:''}</div></li>`).join('');
  alignHoy();
  updateSpine();
}
function updateSpine(){
  const tl=document.getElementById('timeline');if(!tl)return;
  const r=tl.getBoundingClientRect(),vh=innerHeight;
  const p=Math.max(0,Math.min(1,(vh*0.7-r.top)/r.height));
  tl.style.setProperty('--p',(matchMedia('(prefers-reduced-motion: reduce)').matches?100:Math.round(p*100))+'%');
}
addEventListener('scroll',updateSpine,{passive:true});addEventListener('resize',updateSpine);
/* escritorio: "Actualmente cursando" (Formación) a la misma altura que "Mi siguiente paso" (Experiencia) */
function alignHoy(){const tl=document.getElementById('timeline');if(!tl)return;const e=tl.querySelector('li.hoy.edu'),x=tl.querySelector('li.hoy.exp');if(!e||!x)return;e.style.marginTop=matchMedia('(min-width:901px)').matches?(-x.offsetHeight)+'px':''}
addEventListener('resize',alignHoy);addEventListener('load',alignHoy);
/* móvil y tablet: pestañas Experiencia / Formación */
document.querySelectorAll('.tl-tabs [role=tab]').forEach(btn=>btn.addEventListener('click',()=>{
  const tl=document.getElementById('timeline');
  document.querySelectorAll('.tl-tabs [role=tab]').forEach(b=>b.setAttribute('aria-selected',b===btn?'true':'false'));
  tl.classList.toggle('show-exp',btn.dataset.show==='exp');tl.classList.toggle('show-edu',btn.dataset.show==='edu');
  updateSpine();
}));

/* ---------- about ---------- */
const ICON={pin:'<svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 work:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2"/></svg>',
 seal:'<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 21l5-3 5 3-1.5-7"/></svg>',
 mode:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/></svg>',
 lang:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z"/></svg>'};
let facet=0;
const grid=id=>`<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".9" fill="var(--line)"/></pattern>`;
/* map of the Americas: the countries I supported, routes out of the San José hub */
/* etiquetas del mapa: código IATA del aeropuerto de cada país */
const APT={CR:'SJO',GT:'GUA',SV:'SAL',HN:'SAP',PE:'LIM',MX:'MEX',US:'IAD'};
const WORKED={CR:'Costa Rica',GT:'Guatemala',SV:'El Salvador',HN:'Honduras',PE:'Perú',MX:'México',US:'EE. UU. (IAD)'};
const LINKED={};
function vizMap(){
  const name2code={'Costa Rica':'CR','Guatemala':'GT','El Salvador':'SV','Honduras':'HN','Peru':'PE','Mexico':'MX','United States of America':'US'};
  const fill=c=>c==='CR'?'var(--signal)':WORKED[c]?'color-mix(in srgb,var(--signal) 55%,var(--surface))':LINKED[c]?'color-mix(in srgb,var(--route) 18%,var(--surface))':'var(--surface)';
  const land=AM.out.map(f=>{const c=name2code[f.n];return `<path d="${f.d}" fill="${fill(c)}" stroke="${c?'var(--ink)':'var(--line)'}" stroke-width="${c?.5:.6}" stroke-linejoin="round"><title>${c?(WORKED[c]||LINKED[c]):f.n}</title></path>`}).join('');
  const C=AM.cities,h=C.CR;
  const arc=(t,k)=>{const mx=(h[0]+t[0])/2,my=(h[1]+t[1])/2,dx=t[0]-h[0],dy=t[1]-h[1],L=Math.hypot(dx,dy)||1,bend=Math.min(40,L*.35)*k;return `M${h[0]} ${h[1]} Q${(mx-dy/L*bend).toFixed(1)} ${(my+dx/L*bend).toFixed(1)} ${t[0]} ${t[1]}`};
  const R=[['GT',1],['SV',1],['HN',1],['PE',-1],['MX',1],['US',-1]];
  const routes=R.map(([c,k])=>({c,d:arc(C[c],k),far:!WORKED[c]}));
  /* labels placed by hand so the Central American cluster stays readable */
  const LB={PE:[10,4,'start'],MX:[-6,-10,'end'],US:[8,-6,'start']};
  const lbl=c=>{const [x,y]=C[c],[dx,dy,an]=LB[c],tx=x+dx,ty=y+dy;const lead=Math.abs(dx)>16||Math.abs(dy)>14?`<path d="M${x} ${y} L${tx+(an==='end'?2:an==='start'?-2:0)} ${ty-3}" stroke="var(--muted)" stroke-width=".6"/>`:'';return `${lead}<text x="${tx}" y="${ty}" text-anchor="${an}" font-size="9" font-weight="600" font-family="var(--mono)" fill="var(--ink)" paint-order="stroke" stroke="var(--sunk)" stroke-width="3">${APT[c]||c}</text>`};
  return `<svg viewBox="0 0 ${AM.W} ${AM.H}" role="img" aria-label="${T('Mapa de América con los países donde trabajé: Costa Rica, Guatemala, El Salvador, Honduras, Perú, México y EE. UU. (Washington Dulles)','Map of the Americas with the countries I worked in: Costa Rica, Guatemala, El Salvador, Honduras, Peru, Mexico and the US (Washington Dulles).')}">
  <defs>${grid('g1')}</defs><rect width="${AM.W}" height="${AM.H}" fill="var(--sunk)"/><rect width="${AM.W}" height="${AM.H}" fill="url(#g1)"/>
  ${land}
  ${routes.map(r=>`<path d="${r.d}" fill="none" stroke="${r.far?'var(--route)':'var(--signal-ink)'}" stroke-width="1.4" stroke-dasharray="4 4" opacity=".85"><animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.1s" repeatCount="indefinite"/></path>`).join('')}
  ${routes.map((r,i)=>`<circle r="2.6" fill="var(--signal)" stroke="var(--ink)" stroke-width=".8"><animateMotion dur="${(2.2+i*.2).toFixed(1)}s" begin="${(i*.35).toFixed(2)}s" repeatCount="indefinite" path="${r.d}"/></circle>`).join('')}
  ${R.map(r=>r[0]).map(c=>`<circle cx="${C[c][0]}" cy="${C[c][1]}" r="2.6" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>`).join('')}
  <circle cx="${h[0]}" cy="${h[1]}" r="5" fill="var(--signal)" stroke="var(--ink)" stroke-width="1.4"/>
  <circle cx="${h[0]}" cy="${h[1]}" r="5" fill="none" stroke="var(--signal-ink)" stroke-width="1.5"><animate attributeName="r" values="5;16" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="2s" repeatCount="indefinite"/></circle>
  ${Object.keys(LB).map(lbl).join('')}
  ${(()=>{const I=AM.inset,b=I.box;const ic=I.cities;
    const ilb={GT:[-6,-8,'end'],SV:[-4,12,'end'],HN:[2,-9,'middle'],CR:[-8,8,'end']};
    return `<path d="M${b.map(p=>p.join(' ')).join(' L')}Z" fill="none" stroke="var(--ink)" stroke-width=".7" stroke-dasharray="2 2"/>
    <path d="M${b[0][0]} ${b[0][1]} L${I.x+I.w} ${I.y}" stroke="var(--muted)" stroke-width=".6" stroke-dasharray="2 2"/>
    <g><rect x="${I.x}" y="${I.y}" width="${I.w}" height="${I.h}" rx="6" fill="var(--sunk)" stroke="var(--ink)" stroke-width=".8"/>
    <clipPath id="icl"><rect x="${I.x}" y="${I.y}" width="${I.w}" height="${I.h}" rx="6"/></clipPath>
    <g clip-path="url(#icl)">${I.out.map(f=>{const c=name2code[f.n];return `<path d="${f.d}" fill="${fill(c)}" stroke="${c?'var(--ink)':'var(--line)'}" stroke-width=".6" stroke-linejoin="round"><title>${c?WORKED[c]:f.n}</title></path>`}).join('')}
    ${['GT','SV','HN'].map((c,i)=>`<path d="M${ic.CR[0]} ${ic.CR[1]} Q${((ic.CR[0]+ic[c][0])/2+8).toFixed(1)} ${((ic.CR[1]+ic[c][1])/2+6).toFixed(1)} ${ic[c][0]} ${ic[c][1]}" fill="none" stroke="var(--signal-ink)" stroke-width="1.2" stroke-dasharray="3 3"><animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite"/></path>`).join('')}
    ${Object.keys(ic).filter(c=>c!=='NI').map(c=>`<circle cx="${ic[c][0]}" cy="${ic[c][1]}" r="${c==='CR'?4:2.6}" fill="${c==='CR'?'var(--signal)':'var(--surface)'}" stroke="var(--ink)" stroke-width="1"/>`).join('')}
    ${Object.keys(ilb).map(c=>{const [x,y]=ic[c],[dx,dy,an]=ilb[c];return `<text x="${x+dx}" y="${y+dy}" text-anchor="${an}" font-size="8.5" font-weight="600" font-family="var(--mono)" fill="var(--ink)" paint-order="stroke" stroke="var(--sunk)" stroke-width="3">${APT[c]||c}</text>`}).join('')}</g>
    <text x="${I.x+I.w-6}" y="${I.y+11}" text-anchor="end" font-size="7.5" font-family="var(--mono)" fill="var(--muted)" letter-spacing=".06em">${T('CENTROAMÉRICA','CENTRAL AMERICA')}</text></g>`})()}
  <text x="10" y="18" font-size="9" font-family="var(--mono)" fill="var(--muted)" letter-spacing=".08em">${T('VOLARIS · 2016 – 2026','VOLARIS · 2016 – 2026')}</text>
  <g font-size="8.5" font-family="var(--mono)" fill="var(--muted)">
    <rect x="10" y="${AM.H-46}" width="9" height="9" rx="2" fill="color-mix(in srgb,var(--signal) 55%,var(--surface))" stroke="var(--ink)" stroke-width=".5"/><text x="24" y="${AM.H-38}">${T('7 países donde trabajé','7 countries I worked in')}</text>
    
  </g>
  </svg>`;
}
/* continuity: a heartbeat that never drops, 24 hourly blocks lit in turn */
function vizUptime(){
  const beat='M12 120 L60 120 L72 120 L80 96 L90 148 L100 104 L108 120 L150 120 L162 120 L170 96 L180 148 L190 104 L198 120 L228 120';
  const blocks=Array.from({length:24},(_,i)=>{const x=12+(i%12)*18,y=176+Math.floor(i/12)*22;return `<rect x="${x}" y="${y}" width="14" height="16" rx="3" fill="var(--t-data)" opacity=".18"><animate attributeName="opacity" values=".18;.9;.18" dur="4.8s" begin="${(i*.2).toFixed(1)}s" repeatCount="indefinite"/></rect>`}).join('');
  return `<svg viewBox="0 0 240 257" role="img" aria-label="${T('Continuidad: operación disponible las 24 horas.','Continuity: operations available 24 hours a day.')}">
  <defs>${grid('g2')}</defs><rect width="240" height="257" fill="url(#g2)"/>
  <text x="12" y="16" font-size="9" font-family="var(--mono)" fill="var(--muted)" letter-spacing=".08em">BCP · BIA · ${T('DISPONIBILIDAD','AVAILABILITY')}</text>
  <circle cx="224" cy="13" r="3.5" fill="var(--t-data)"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <text x="12" y="58" font-size="40" font-weight="700" font-family="var(--display)" fill="var(--ink)">24/7</text>
  <text x="96" y="46" font-size="9.5" font-family="var(--mono)" fill="var(--muted)">${T('operación crítica','critical operations')}</text>
  <text x="96" y="58" font-size="9.5" font-family="var(--mono)" fill="var(--muted)">${T('hotelería · aviación','hospitality · aviation')}</text>
  <path d="${beat}" fill="none" stroke="var(--line)" stroke-width="2"/>
  <path d="${beat}" fill="none" stroke="var(--t-data)" stroke-width="2.4" stroke-linejoin="round" stroke-dasharray="60 400"><animate attributeName="stroke-dashoffset" from="460" to="0" dur="2.4s" repeatCount="indefinite"/></path>
  ${blocks}
  </svg>`;
}
/* generative AI: a request goes through the model and comes out as a finished task */
function vizAI(){
  const node=(cy,c,ic,label,sub)=>`<g><rect x="52" y="${cy-17}" width="136" height="34" rx="9" fill="var(--surface)" stroke="var(--line)"/><rect x="52" y="${cy-17}" width="34" height="34" rx="9" fill="${c}"/><rect x="77" y="${cy-17}" width="9" height="34" fill="${c}"/><text x="69" y="${cy+4.5}" text-anchor="middle" font-size="13" fill="#fff">${ic}</text><text x="94" y="${cy-1}" font-size="11.5" font-weight="600" font-family="var(--body)" fill="var(--ink)">${label}</text><text x="94" y="${cy+11}" font-size="9" font-family="var(--mono)" fill="var(--muted)">${sub}</text></g>`;
  const path='M120 30 L120 230';
  const doc=b=>`<g opacity="0"><rect x="-6" y="-8" width="12" height="16" rx="2" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.2"/><path d="M-3 -3h6M-3 0h6M-3 3h4" stroke="var(--muted)" stroke-width="1"/><animateMotion dur="6s" begin="${b}s" repeatCount="indefinite" path="${path}" keyPoints="0;.3;.3;.56;.56;.82;.82;1" keyTimes="0;.15;.3;.45;.6;.75;.85;1" calcMode="linear"/><animate attributeName="opacity" dur="6s" begin="${b}s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.05;.9;1"/></g>`;
  return `<svg viewBox="0 0 240 257" role="img" aria-label="${T('IA generativa: una solicitud pasa por Claude o ChatGPT y sale como tarea resuelta.','Generative AI: a request goes through Claude or ChatGPT and comes out as a finished task.')}">
  <defs>${grid('g3')}</defs><rect width="240" height="257" fill="url(#g3)"/>
  <text x="12" y="16" font-size="9" font-family="var(--mono)" fill="var(--muted)" letter-spacing=".08em">${T('IA · EN USO','AI · IN USE')}</text>
  <circle cx="224" cy="13" r="3.5" fill="var(--t-ai)"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <path d="${path}" stroke="var(--line)" stroke-width="2"/>
  <path d="${path}" stroke="var(--t-ai)" stroke-width="2" stroke-dasharray="4 8" opacity=".55"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite"/></path>
  ${node(66,'var(--t-trig)','✎',T('Solicitud','Request'),T('proceso del negocio','business process'))}
  ${node(118,'var(--t-ai)','◎','Claude · ChatGPT',T('IA generativa','generative AI'))}
  ${node(170,'var(--t-logic)','⌕',T('Revisión','Review'),T('criterio humano','human judgement'))}
  ${node(222,'var(--t-data)','✓',T('Resultado','Result'),T('tarea resuelta','task done'))}
  ${doc(0)}${doc(2)}${doc(4)}
  </svg>`;
}
function facetData(){
  return [
   {b:T('Infraestructura','Infrastructure'),c:'var(--t-warn)',v:vizMap(),map:true,
    h:T('Liderazgo TI en 7 países','IT leadership in 7 countries'),
    p:T('En Volaris fui parte del grupo habilitador tecnológico de la operación en 7 países de América: más de 180 usuarios corporativos y estaciones aeroportuarias, aperturas en Centroamérica, Sudamérica y EE. UU.','At Volaris I was part of the technology enablement team for operations in 7 countries across the Americas: 180+ corporate users and airport stations, launches in Central America, South America and the US.'),
    m:'7 · 180+',ms:T('países y usuarios corporativos','countries and corporate users'),tags:['ITIL','MPLS','Windows Server','Active Directory']},
   {b:T('Continuidad','Continuity'),c:'var(--t-data)',v:vizUptime(),
    h:T('La operación no se detiene','Operations never stop'),
    p:T('En hotelería y aviación no hay ventana para fallar. Migré los Sistemas Fidelio a Sistemas MICROS Opera sin detener un hotel 24/7 y formé parte de la certificación de una aerolínea ante la DGAC.','In hospitality and aviation there is no window to fail. I migrated Fidelio to MICROS Opera without stopping a 24/7 hotel and was part of an airline\'s DGAC certification.'),
    m:'24/7',ms:T('Operación crítica sostenida','sustained critical operations'),tags:['BCP','BIA',T('Riesgo','Risk'),'DGAC']},
   {b:T('IA generativa','Generative AI'),c:'var(--t-ai)',v:vizAI(),
    h:T('IA generativa','Generative AI'),
    p:T('Formación en Claude y ChatGPT, para llevar la IA a procesos reales con criterio y control.','Training in Claude and ChatGPT, to bring AI into real processes with judgement and control.'),
    m:'2026',ms:T('Máster en IA · EUDE Business School - España -','Master\'s in AI · EUDE Business School - Spain'),tags:['Claude','ChatGPT','Scrum',T('Capacitación','Training')]}];
}
function renderAbout(){
  const F=facetData();
  document.getElementById('aboutBody').innerHTML=`
   <div>
     <p class="statement">${T('Mantengo la operación funcionando y la tecnología al servicio del negocio.','I keep operations running and technology working for the business.')}</p>
     <p class="about-intro">${T('Amplia experiencia liderando infraestructura y operaciones de TI para multinacionales en los sectores corporativo, hotelero y de aviación. Equilibro ejecución técnica, riesgo, proveedores y presupuesto con la disponibilidad operativa. Esto es lo que aporto:','Extensive experience leading IT infrastructure and operations for multinationals in corporate, hospitality and aviation. I balance technical execution, risk, vendors and budget against operational availability. This is what I bring:')}</p>
     <div class="facets" role="tablist" aria-label="${T('Lo que aporto','What I bring')}">${F.map((f,i)=>`<button type="button" role="tab" id="fct${i}" aria-selected="${i===facet}" style="--c:${f.c}"><i></i>${f.b}</button>`).join('')}</div>
     <div class="facet-panel" id="facetPanel" role="tabpanel"></div>
   </div>
   <div>
     <div class="badge-wrap">
       <div class="lan" id="lan" tabindex="0" aria-label="${T('Credencial de Víctor Mena Vega','Víctor Mena Vega\'s badge')}">
         <div class="lan-strap"></div><div class="lan-clip"></div>
         <div class="idcard">
           <div class="stripe"><span>TI · OPS ID</span><span>VMV-2026</span></div>
           <div class="photo-wrap"><img class="photo" src="assets/badge-photo-sueter3.jpg" alt="Víctor Mena Vega, especialista en infraestructura y operaciones de TI en San José, Costa Rica" draggable="false"><svg class="otw-ring" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="otwG" gradientUnits="userSpaceOnUse" x1="6" y1="30" x2="60" y2="96"><stop offset="0" stop-color="#2f7d32" stop-opacity="0"/><stop offset=".3" stop-color="#2f7d32"/><stop offset="1" stop-color="#2f7d32"/></linearGradient><path id="otwArc" d="M8.65 34.95A44 44 0 0 0 57.6 93.3"/></defs><use href="#otwArc" fill="none" stroke="url(#otwG)" stroke-width="13" stroke-linecap="round"/><text dy="2.6"><textPath href="#otwArc" startOffset="55%" text-anchor="middle">#OPENTOWORK</textPath></text></svg></div>
           <div class="idbody">
             <strong>Víctor Mena Vega</strong>
             <span class="otw" title="Colegio Profesional de Informática y Computación">${T('Incorporado al CPIC','CPIC member')}</span>
             <div class="idmode">${ICON.mode}<div>${T('Híbrido / Remoto / Presencial','Hybrid / Remote / On-site')}<small>${T('Modalidad de trabajo','Work arrangement')}</small></div></div>
             <div class="idrow"><div class="idi">${ICON.pin}<b>San José, Costa Rica</b></div><div class="idi">${ICON.lang}<div><span class="lng">${T('Inglés B1<br>Técnico<br><b>(en curso)</b>','English B1<br>Technical<br><b>(in progress)</b>')}</span></div></div></div>
           </div>
         </div>
       </div>
     </div>
     <span class="hint">${T('Arrastra la tarjeta','Drag the badge')}</span>
   </div>`;
  const tabs=[...document.querySelectorAll('.facets [role="tab"]')];
  tabs.forEach((b,i)=>{b.addEventListener('click',()=>showFacet(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;showFacet(n);tabs[n].focus()}})});
  showFacet(facet,true);
  initLanyard();
}
function showFacet(i,first){
  facet=i;const f=facetData()[i],p=document.getElementById('facetPanel');
  document.querySelectorAll('.facets [role="tab"]').forEach((b,j)=>b.setAttribute('aria-selected',String(j===i)));
  p.setAttribute('aria-labelledby','fct'+i);p.style.setProperty('--c',f.c);p.classList.toggle('has-map',!!f.map);
  p.innerHTML=`<div class="fp-vis${f.map?' is-map':''}">${f.v}</div><div class="fp-text"><h3>${f.h}</h3><p>${f.p}</p><span class="fp-proof"><b>${f.m}</b><span>${f.ms}</span></span><div class="fp-tags">${f.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`;
  if(!first){p.classList.remove('swap');void p.offsetWidth;p.classList.add('swap')}
}

/* ---------- certifications ---------- */
function renderCerts(){
  /* [seal, issuer, title es, title en, text es, text en, year] */
  const C=[
   ["SFC","SCRUMstudy · VMEdu","Scrum Fundamentals Certified","Scrum Fundamentals Certified","Fundamentos de Scrum y gestión ágil de proyectos.","Scrum fundamentals and agile project management.","2026"],
   ["AI",T("IA generativa","Generative AI"),"Claude","Claude","Cursos prácticos de IA generativa para el trabajo diario.","Hands-on generative AI courses for everyday work.","2026",["AI Fluency: Framework & Foundations","Claude Code 101","Claude 101"]],
   ["GPT",T("IA generativa","Generative AI"),"ChatGPT","ChatGPT","Uso práctico de ChatGPT en el trabajo diario.","Hands-on use of ChatGPT for everyday work.","2026",["Applied AI Foundations"]],
   ["G","Google Cloud","Google","Google","Formación en computación en la nube.","Cloud computing training.","2026",["Cloud Computing Foundations"]],
   ["UN","UNESCO · LG AI Research","Global MOOC on the Ethics of AI","Global MOOC on the Ethics of AI","Curso global sobre la ética de la inteligencia artificial.","Global course on the ethics of artificial intelligence.","2026"]];
  document.getElementById('certsLead').textContent=T('Formación académica y certificaciones. Arrastra o usa las flechas.','Degrees and certifications. Drag or use the arrows.');
  document.getElementById('certs').innerHTML=C.map(c=>`<article class="cert"><span class="seal">${c[0]}</span><span class="iss">${c[1]}</span><h4>${T(c[2],c[3])}</h4><p>${T(c[4],c[5])}</p>${c[7]?`<ul class="cert-ul">${c[7].map(x=>`<li>${x.replace(/&/g,'&amp;')}</li>`).join('')}</ul>`:''}${c[6]?`<span class="yr">${c[6]}</span>`:''}</article>`).join('');
  document.getElementById('cdots').innerHTML=C.map((_,i)=>`<button type="button" aria-label="${i+1}" aria-current="${i===0}"></button>`).join('');
  document.querySelectorAll('#cdots button').forEach((b,i)=>b.addEventListener('click',()=>{const c=certsEl.children[i];certsEl.scrollTo({left:c.offsetLeft-certsEl.offsetLeft,behavior:'smooth'})}));
  syncDots();
}
const certsEl=document.getElementById('certs');
function syncDots(){
  const cards=[...certsEl.children],n=cards.length;if(!n)return;
  const max=certsEl.scrollWidth-certsEl.clientWidth;
  const best=max<=0?0:Math.round(certsEl.scrollLeft/max*(n-1));
  cards.forEach((c,i)=>c.classList.toggle('active',i===best));
  document.querySelectorAll('#cdots button').forEach((b,i)=>b.setAttribute('aria-current',String(i===best)));
}
certsEl.addEventListener('scroll',()=>requestAnimationFrame(syncDots),{passive:true});
document.getElementById('cPrev').addEventListener('click',()=>certsEl.scrollBy({left:-300,behavior:'smooth'}));
document.getElementById('cNext').addEventListener('click',()=>certsEl.scrollBy({left:300,behavior:'smooth'}));
certsEl.addEventListener('keydown',e=>{if(e.key==='ArrowRight')certsEl.scrollBy({left:300,behavior:'smooth'});if(e.key==='ArrowLeft')certsEl.scrollBy({left:-300,behavior:'smooth'})});
(function(){let down=false,sx=0,sl=0;
  certsEl.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;sx=e.clientX;sl=certsEl.scrollLeft;certsEl.classList.add('dragging')});
  addEventListener('pointermove',e=>{if(!down)return;certsEl.scrollLeft=sl-(e.clientX-sx)});
  addEventListener('pointerup',()=>{if(!down)return;down=false;certsEl.classList.remove('dragging')});
})();

/* ---------- WhatsApp: en escritorio abre WhatsApp Web, en celular la app ---------- */
(function(){
  document.querySelectorAll('#waFab,#ctaTalk').forEach(wa=>wa.addEventListener('click',e=>{
    if(matchMedia('(pointer:coarse)').matches)return;
    e.preventDefault();
    const u=new URL(wa.href);
    window.open('https://web.whatsapp.com/send?phone=50688202220&text='+encodeURIComponent(u.searchParams.get('text')||''),'_blank','noopener');
  }));})();

/* ---------- recomendaciones ---------- */
(function(){
  const box=document.getElementById('recs');if(!box)return;
  const qs=[...box.querySelectorAll('.rec')],tabs=[...box.querySelectorAll('.rec-tab')];let cur=0;
  const show=(i,focus)=>{cur=(i+qs.length)%qs.length;
    qs.forEach((q,k)=>q.classList.toggle('on',k===cur));
    tabs.forEach((t,k)=>{t.setAttribute('aria-selected',String(k===cur));t.tabIndex=k===cur?0:-1;
      const pr=t.querySelector('.rec-prog');pr.style.animation='none';void pr.offsetWidth;pr.style.animation=''});
    const t=tabs[cur];if(focus)t.focus();
    const row=t.parentElement;if(row.scrollWidth>row.clientWidth)row.scrollTo({left:t.offsetLeft-row.offsetLeft-16,behavior:'smooth'})};
  tabs.forEach((t,k)=>{t.addEventListener('click',()=>show(k));
    t.querySelector('.rec-prog').addEventListener('animationend',()=>{if(k===cur)show(cur+1)});
    t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();show(cur+1,true)}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();show(cur-1,true)}})});
  if('IntersectionObserver' in window)new IntersectionObserver(es=>box.classList.toggle('inview',es[0].isIntersecting),{threshold:.3}).observe(box);
  show(0);
})();

/* ---------- marquee ---------- */
function renderMarquee(){const w=T('Hablemos','Let\'s talk')+' <i class="mq-dot">·</i> ';document.getElementById('mq').innerHTML=w.repeat(8)}

/* ---------- hero video ---------- */
const IC={replay:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>',play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
 on:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 off:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'};
const hv=document.getElementById('heroVideo'),ppBtn=document.getElementById('ppBtn');
let userPaused=matchMedia('(prefers-reduced-motion: reduce)').matches;
let wantSound=false; /* sin botón de sonido: el video va siempre en silencio */
function syncVideoUI(){
  const playing=!hv.paused;
  ppBtn.innerHTML=playing?IC.pause:IC.play;ppBtn.setAttribute('aria-label',playing?T('Pausar vídeo','Pause video'):T('Reproducir vídeo','Play video'));ppBtn.setAttribute('aria-pressed',String(!playing));
}
/* sin pantalla de entrada ni botón de sonido: el video arranca solo y siempre en silencio */
const root=document.documentElement;
const fontsOk=()=>root.classList.add('fonts-ok');
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(fontsOk);setTimeout(fontsOk,1200)}else fontsOk();
const gateDone=true;
function playVideo(){
  if(!gateDone||hv.ended)return;
  hv.muted=!wantSound;
  const p=hv.play();
  if(p&&p.catch)p.catch(()=>{if(!hv.muted){hv.muted=true;hv.play().catch(()=>{})}});
}
ppBtn.addEventListener('click',e=>{e.stopPropagation();if(hv.paused){userPaused=false;if(hv.ended)hv.currentTime=0;hv.muted=!wantSound;hv.play().catch(()=>{hv.muted=true;hv.play().catch(()=>{})})}else{userPaused=true;hv.pause()}});
hv.addEventListener('click',()=>ppBtn.click());
/* en computadora: pasar el mouse sobre la persona la hace saludar de nuevo (si el video no se está reproduciendo) */
if(matchMedia('(hover: hover) and (pointer: fine)').matches)hv.addEventListener('mouseenter',()=>{if(hv.paused)ppBtn.click()});
['play','pause','ended','volumechange'].forEach(e=>hv.addEventListener(e,syncVideoUI));
if('IntersectionObserver' in window){new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){if(!userPaused)playVideo()}else if(!hv.paused){hv.pause()}})},{threshold:.25}).observe(document.getElementById('heroSec'))}
else if(!userPaused)playVideo();
function renderHero(){
  document.getElementById('heroPlace').textContent='San José, Costa Rica';
  document.getElementById('h1a').textContent=T('Líder TI','Regional');
  document.getElementById('h1b').textContent=T('regional.','IT leader.');
  document.getElementById('heroRoles').textContent=T('Resiliencia tecnológica · Infraestructura · Operaciones TI · IA generativa','Technology resilience · Infrastructure · IT operations · Generative AI');
  document.getElementById('ctaWork').textContent=T('Ver proyectos','Explore work');

  document.getElementById('scrollTxt').textContent=T('Bajar','Scroll');
  hv.setAttribute('aria-label',T('Vídeo: Víctor se presenta','Video: Víctor introduces himself'));
  syncVideoUI();
}

/* ---------- lanyard badge: spring pendulum, drag to swing ---------- */
const lanReduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let lanA=0,lanV=0,lanDrag=false,lanRun=false,lanEl=null;
function lanStep(){
  if(!lanEl){lanRun=false;return}
  if(!lanDrag){lanV+=-0.045*lanA;lanV*=0.94;lanA+=lanV}
  lanEl.style.transform=`rotate(${lanA.toFixed(2)}deg)`;
  if(lanDrag||Math.abs(lanA)>.05||Math.abs(lanV)>.05)requestAnimationFrame(lanStep);else{lanA=0;lanV=0;lanEl.style.transform='';lanRun=false}
}
function lanKick(v){if(lanReduce||!lanEl)return;lanV+=v;if(!lanRun){lanRun=true;requestAnimationFrame(lanStep)}}
function initLanyard(){
  lanEl=document.getElementById('lan');if(!lanEl)return;
  let sx=0,sa=0;
  lanEl.addEventListener('pointerdown',e=>{if(lanReduce)return;lanDrag=true;sx=e.clientX;sa=lanA;lanEl.classList.add('dragging');lanEl.setPointerCapture(e.pointerId);if(!lanRun){lanRun=true;requestAnimationFrame(lanStep)}});
  lanEl.addEventListener('pointermove',e=>{if(!lanDrag)return;const na=Math.max(-35,Math.min(35,sa+(e.clientX-sx)*0.25));lanV=na-lanA;lanA=na});
  const up=()=>{if(!lanDrag)return;lanDrag=false;lanEl.classList.remove('dragging')};
  lanEl.addEventListener('pointerup',up);lanEl.addEventListener('pointercancel',up);
  lanEl.addEventListener('mouseenter',()=>lanKick(1.6));
  lanEl.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')lanKick(-3);if(e.key==='ArrowRight')lanKick(3)});
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){lanKick(2.4);io.disconnect()}},{threshold:.5});io.observe(lanEl)}
}

/* ---------- copy ---------- */
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>{
  const el=document.getElementById(b.dataset.copy),txt=el.textContent.trim();
  const ok=()=>{b.textContent=T('Copiado','Copied');setTimeout(()=>{b.textContent=T('Copiar','Copy')},1500)};
  const sel=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)};
  try{navigator.clipboard.writeText(txt).then(ok,sel)}catch(e){sel()}
}));

/* ---------- language ---------- */
function setLang(l){
  LANG=l;const d=l==='en'?EN:ES;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(d[k]!=null)el.innerHTML=d[k]});
  document.documentElement.lang=l;
  document.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===l)));
  renderNav();renderSkills();renderProjects();renderTimeline();renderHero();renderAbout();renderCerts();renderMarquee();
}
document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
let start='es';
try{localStorage.removeItem('lang')}catch(e){}
setLang(start);
