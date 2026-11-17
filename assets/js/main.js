'use strict';
(() => {
  const i18n = window.BN_I18N || {};
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', scrollY > 32);
  window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();

  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownBtn = document.querySelector('.nav-dropdown__toggle');
  const setDropdown = open => {
    if (!dropdown || !dropdownBtn) return;
    dropdown.classList.toggle('is-open', open);
    dropdownBtn.setAttribute('aria-expanded', String(open));
    dropdownBtn.setAttribute('aria-label', open ? (i18n.closeTrips || 'Close') : (i18n.openTrips || 'Open'));
  };
  dropdownBtn?.addEventListener('click', e => {
    e.stopPropagation(); setDropdown(!dropdown.classList.contains('is-open'));
  });
  document.addEventListener('click', e => {
    if (!dropdown?.contains(e.target)) setDropdown(false);
    const language = document.querySelector('.language-switcher');
    if (language && !language.contains(e.target)) language.open = false;
  });
  dropdown?.addEventListener('focusout', e => {
    if (!dropdown.contains(e.relatedTarget)) setDropdown(false);
  });

  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const setMenu = open => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? (i18n.closeMenu || 'Close') : (i18n.openMenu || 'Open'));
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('nav-open', open);
    if (!open) toggle.focus({preventScroll:true});
  };
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (mobileMenu?.classList.contains('is-open')) setMenu(false);
    setDropdown(false);
    const language = document.querySelector('.language-switcher'); if (language) language.open = false;
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 1300 && mobileMenu?.classList.contains('is-open')) setMenu(false); }, {passive:true});

  const intro = document.querySelector('.intro-overlay');
  if (intro) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try { seen = sessionStorage.getItem('bntours_intro_v2') === 'yes'; } catch (_) {}
    if (reduced || seen) intro.remove();
    else {
      const done = () => {
        intro.classList.add('is-exiting');
        try { sessionStorage.setItem('bntours_intro_v2','yes'); } catch (_) {}
        window.setTimeout(() => intro.remove(), 850);
      };
      window.setTimeout(done, 2200);
    }
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); self.unobserve(entry.target); } });
    }, {threshold:0.06,rootMargin:'0px 0px 20px 0px'});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el=>el.classList.add('visible'));

  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    let selected = null;
    try { selected = localStorage.getItem('bntours_privacy_v2'); } catch(_) {}
    if (!selected) window.setTimeout(() => banner.classList.add('is-visible'), 1700);
    banner.querySelectorAll('[data-consent]').forEach(btn=>btn.addEventListener('click', () => {
      try { localStorage.setItem('bntours_privacy_v2',btn.dataset.consent); } catch(_) {}
      banner.classList.remove('is-visible');
    }));
    document.querySelectorAll('[data-open-privacy]').forEach(a=>a.addEventListener('click', e=>{
      e.preventDefault(); banner.classList.add('is-visible');
    }));
  }

  const form = document.querySelector('[data-enquiry-form]');
  if (form) {
    const dateMin = new Date();
    // Use local calendar day, not UTC, when enforcing the earliest departure date.
    const now = [dateMin.getFullYear(),String(dateMin.getMonth()+1).padStart(2,'0'),String(dateMin.getDate()).padStart(2,'0')].join('-');
    form.querySelectorAll('input[type=date]').forEach(input=>input.min=now);
    const firstDate = form.querySelector('#datum_polaska');
    const lastDate = form.querySelector('#datum_povratka');
    firstDate?.addEventListener('change',()=> { if(lastDate) {lastDate.min=firstDate.value||now;if(lastDate.value && lastDate.value<lastDate.min) lastDate.value='';} });
    const pref = new URLSearchParams(location.search).get('destinacija');
    if (pref) { const destInput = form.querySelector('#destinacija'); if (destInput) destInput.value=pref.slice(0,150); }
    const status = form.querySelector('[data-form-status]');
    const btn = form.querySelector('[type=submit]');
    const initialButton = btn.innerHTML;
    const setStatus = (message,type)=>{
      status.textContent=message;
      status.className='form-status form-status--'+type;
      status.hidden=false;
      status.setAttribute('role',type==='error'?'alert':'status');
    };
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if(!form.reportValidity()) return;
      const data=new FormData(form);
      if(data.get('website')) return;
      const accessKey=window.BN_CONFIG?.web3formsAccessKey || '';
      const recipient=window.BN_CONFIG?.enquiryEmail || 'bntoursbn@hotmail.com';
      if(accessKey){
        btn.disabled=true;btn.textContent=i18n.sendBusy||'Sending...';
        try {
          data.set('access_key',accessKey);
          data.set('subject',i18n.formSubject||'BN Tours enquiry');
          data.set('from_name','BN Tours website');
          const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data});
          const result=await response.json();
          if(!response.ok || !result.success) throw new Error('Request failed');
          setStatus(i18n.sendSuccess||'Sent successfully.','success'); form.reset();
        } catch (_){setStatus((i18n.sendFail||'Please email')+' '+recipient+'.','error');}
        finally {btn.disabled=false;btn.innerHTML=initialButton;}
      } else {
        const labels={ime:'Name',email:'Email',telefon:'Phone',vrsta:'Trip type',polazak:'Departure point',destinacija:'Destination',datum_polaska:'Departure date',datum_povratka:'Return date',putnici:'Travellers',napomena:'Notes'};
        const lines=Object.entries(labels).filter(([k])=>data.get(k)).map(([k,label])=>label+': '+data.get(k));
        const text=(i18n.enquiryIntro||'Hello,')+'\n\n'+lines.join('\n')+'\n\nBN Tours';
        const subject=encodeURIComponent(i18n.formSubject||'BN Tours enquiry');
        setStatus(i18n.sendMailto||'Your email application is opening.','success');
        window.location.href='mailto:'+encodeURIComponent(recipient)+'?subject='+subject+'&body='+encodeURIComponent(text);
      }
    });
  }
})();
