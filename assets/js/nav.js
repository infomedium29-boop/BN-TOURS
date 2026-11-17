export function initNavigation(){
 const triggers=document.querySelectorAll('[data-nav-trigger]');
 function close(){triggers.forEach(b=>{b.setAttribute('aria-expanded','false');b.closest('.nav-item')?.classList.remove('menu-open')})}
 triggers.forEach(btn=>btn.addEventListener('click',ev=>{ev.stopPropagation();let was=btn.getAttribute('aria-expanded')==='true';close();if(!was){btn.setAttribute('aria-expanded','true');btn.closest('.nav-item')?.classList.add('menu-open')}}));
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))close();if(!e.target.closest('.lang-select')){const s=document.querySelector('.lang-select');s?.classList.remove('open');s?.querySelector('button')?.setAttribute('aria-expanded','false')}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=document.querySelector('[data-nav-trigger][aria-expanded="true"]');close();if(active)active.focus();closeDrawer();const s=document.querySelector('.lang-select');s?.classList.remove('open');s?.querySelector('button')?.setAttribute('aria-expanded','false')}});
 const drawer=document.querySelector('[data-drawer]'),shade=document.querySelector('[data-drawer-shade]'),open=document.querySelector('[data-drawer-open]'),exit=document.querySelector('[data-drawer-close]');
 function openDrawer(){if(!drawer)return;drawer.classList.add('open');shade?.classList.add('open');document.body.classList.add('is-menu-open');open?.setAttribute('aria-expanded','true');exit?.focus()}
 function closeDrawer(){if(!drawer)return;drawer.classList.remove('open');shade?.classList.remove('open');document.body.classList.remove('is-menu-open');open?.setAttribute('aria-expanded','false')}
 open?.addEventListener('click',openDrawer);exit?.addEventListener('click',()=>{closeDrawer();open?.focus()});shade?.addEventListener('click',closeDrawer);
 drawer?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));
 document.querySelector('.lang-select>button')?.addEventListener('click',()=>{const s=document.querySelector('.lang-select');const isOpen=s?.classList.toggle('open');s?.querySelector('button')?.setAttribute('aria-expanded',String(!!isOpen))});
 if(location.pathname.endsWith('/putovanje.html')&&location.search){document.querySelectorAll('.lang-pop a,.drawer-languages a').forEach(a=>{if(a.getAttribute('href')?.endsWith('/putovanje.html'))a.setAttribute('href',a.getAttribute('href')+location.search)})}
 document.querySelector('.lightbox')?.addEventListener('click',e=>{if(e.target.classList.contains('lightbox'))e.currentTarget.classList.remove('open')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.lightbox')?.classList.remove('open')});
}
