(()=>{'use strict';
// The design never delays interaction to wait for remote images.
const hero=document.querySelector('.cinema-hero');
if(hero){
 const slides=[...hero.querySelectorAll('.cinema-slide')],dots=[...hero.querySelectorAll('[data-slide]')];
 let active=0;
 function show(i){active=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('is-active',n===active));dots.forEach((d,n)=>{d.classList.toggle('is-current',n===active);d.setAttribute('aria-pressed',String(n===active));});}
 dots.forEach((d,n)=>d.addEventListener('click',()=>show(n)));
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(()=>{if(!document.hidden&&slides.length>1)show(active+1);},7000);}
}
const cards=[...document.querySelectorAll('[data-trip-card]')],filters=[...document.querySelectorAll('[data-filter]')],empty=document.querySelector('[data-empty]');
if(cards.length && filters.length){
 const params=new URLSearchParams(location.search),inp=document.querySelector('.catalog-section [name="q"]');
 let term=(params.get('q')||'').trim().toLocaleLowerCase(),cat=params.get('cat')||'all';
 if(inp)inp.value=term;const valid=['all','coast','city','nature'];if(!valid.includes(cat))cat='all';
 function apply(){let n=0;cards.forEach(c=>{const match=(!term || ((c.dataset.name||'')+' '+(c.dataset.description||'')).toLocaleLowerCase().includes(term))&&(cat==='all'||c.dataset.category===cat);c.hidden=!match;if(match)n++;});filters.forEach(f=>{const ok=f.dataset.filter===cat;f.classList.toggle('is-active',ok);f.setAttribute('aria-pressed',String(ok));});if(empty)empty.hidden=n!==0;}
 filters.forEach(f=>f.addEventListener('click',()=>{cat=f.dataset.filter;apply();const u=new URL(location.href);cat==='all'?u.searchParams.delete('cat'):u.searchParams.set('cat',cat);history.replaceState(null,'',u.pathname+u.search+u.hash);}));
 inp?.addEventListener('input',()=>{term=inp.value.trim().toLocaleLowerCase();apply();});
 document.querySelector('[data-clear]')?.addEventListener('click',()=>{term='';cat='all';if(inp)inp.value='';history.replaceState(null,'',location.pathname);apply();});
 apply();
}
// Prevent sidebar links from accidentally triggering native form validation on other pages.
})();
