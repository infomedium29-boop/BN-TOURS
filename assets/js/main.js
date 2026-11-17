'use strict';
(function () {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const intro = document.querySelector('.intro-overlay');

  const setScrolled = () => header && header.classList.toggle('is-scrolled', window.scrollY > 35);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  const setMenu = (open) => {
    if (!mobileToggle || !mobileMenu) return;
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Zatvori izbornik' : 'Otvori izbornik');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('nav-open', open);
  };
  mobileToggle?.addEventListener('click', () => setMenu(mobileToggle.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 940) setMenu(false); });

  if (intro) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('bn_intro_seen') === 'yes'; } catch (_) {}
    if (reduced || alreadySeen) {
      intro.remove();
    } else {
      document.body.style.overflow = 'hidden';
      const finishIntro = () => {
        intro.classList.add('is-exiting');
        document.body.style.overflow = '';
        try { sessionStorage.setItem('bn_intro_seen','yes'); } catch (_) {}
        window.setTimeout(() => intro.remove(), 850);
      };
      window.setTimeout(finishIntro, 2550);
    }
  }

  const toReveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
    }, { threshold: .08, rootMargin: '0px 0px 20px 0px' });
    toReveal.forEach(el => observer.observe(el));
  } else toReveal.forEach(el => el.classList.add('visible'));

  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    let setting = null;
    try { setting = localStorage.getItem('bn_privacy_choice'); } catch (_) {}
    if (!setting) window.setTimeout(() => cookieBanner.classList.add('is-visible'), 8500);
    cookieBanner.querySelectorAll('[data-consent]').forEach(btn => btn.addEventListener('click', () => {
      try { localStorage.setItem('bn_privacy_choice', btn.dataset.consent); } catch (_) {}
      cookieBanner.classList.remove('is-visible');
    }));
    document.querySelectorAll('[data-open-privacy]').forEach(btn => btn.addEventListener('click', e => {
      e.preventDefault();cookieBanner.classList.add('is-visible');
    }));
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  document.querySelectorAll('input[type="date"]').forEach(input => input.min = `${yyyy}-${mm}-${dd}`);

  const form = document.querySelector('[data-enquiry-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const submit = form.querySelector('[type=submit]');
    const setStatus = (message, kind) => {
      status.textContent = message;
      status.className = 'form-status form-status--' + kind;
      status.hidden = false;
      status.setAttribute('role', kind === 'error' ? 'alert' : 'status');
    };
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      if (data.get('website')) return; // hidden spam trap
      const values = Object.fromEntries(data.entries());
      const accessKey = window.BN_CONFIG?.web3formsAccessKey || '';
      const recipient = window.BN_CONFIG?.enquiryEmail || 'bntoursbn@hotmail.com';
      if (accessKey) {
        submit.disabled = true;
        submit.textContent = 'Slanje...';
        try {
          const body = new FormData(form);
          body.set('access_key', accessKey);
          body.set('subject', 'Novi upit s web stranice BN Tours');
          body.set('from_name', 'BN Tours web');
          const response = await fetch('https://api.web3forms.com/submit', {method:'POST',body});
          const result = await response.json();
          if (!response.ok || !result.success) throw new Error(result.message || 'Slanje nije uspjelo.');
          setStatus('Hvala! Vaš upit je poslan. Javit ćemo vam se čim ga pregledamo.', 'success');
          form.reset();
        } catch (_) {
          setStatus('Slanje trenutačno nije dostupno. Molimo nazovite nas ili pošaljite poruku na '+recipient+'.', 'error');
        } finally {
          submit.disabled = false;
          submit.innerHTML = 'Pošalji upit <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>';
        }
      } else {
        const labels = {
          ime:'Ime i prezime', email:'E-mail', telefon:'Telefon', vrsta:'Vrsta putovanja',
          polazak:'Mjesto polaska', destinacija:'Željena destinacija',
          datum_polaska:'Datum polaska', datum_povratka:'Datum povratka',
          putnici:'Broj putnika', napomena:'Dodatne informacije'
        };
        const lines = Object.keys(labels).filter(k => values[k]).map(k => labels[k] + ': ' + values[k]);
        const subject = encodeURIComponent('Upit za putovanje – BN Tours');
        const body = encodeURIComponent('Poštovani,\n\nzanima me organizacija putovanja.\n\n' + lines.join('\n') + '\n\nLijep pozdrav');
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;
        setStatus('Otvara se vaš program za e-poštu. Upit će biti poslan tek kad potvrdite slanje poruke.', 'success');
        window.location.href = mailto;
      }
    });
  }
})();
