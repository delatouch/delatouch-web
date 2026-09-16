/* =========================================================
   Delatouch — script principal
   ---------------------------------------------------------
   ÚNICA COSA QUE TIENES QUE TOCAR: la línea de abajo.
   Cuando tengas la cuenta de Formspree, pega aquí tu ID
   (lo que va detrás de formspree.io/f/ ). Ejemplo:
       const FORMSPREE_ID = 'xbjnqkla';
   Mientras esté vacío, el formulario abre el cliente de
   correo del visitante con el mensaje ya escrito.
   ========================================================= */
const FORMSPREE_ID = 'xoevazvz';
const CONTACT_EMAIL = 'mail@delatouch.com';


// --- Language toggle (ES / EN) ---
(function () {
  const STORAGE_KEY = 'delatouch-lang';
  const nodes = document.querySelectorAll('[data-i18n-es]');
  const langBtn = document.getElementById('lang-btn');
  const langBtnMobile = document.getElementById('lang-btn-mobile');
  const metaDesc = document.getElementById('meta-desc');
  const descriptions = {
    en: 'Delatouch. Illustration, graphic design, branding, character design. Álvaro Quintana González.',
    es: 'Delatouch. Ilustración, diseño gráfico, branding, diseño de personajes. Álvaro Quintana González.'
  };

  function applyLang(lang) {
    nodes.forEach((el) => {
      const value = lang === 'es' ? el.getAttribute('data-i18n-es') : el.getAttribute('data-i18n-en');
      if (value != null) el.innerHTML = value;
    });
    document.documentElement.lang = lang;
    if (metaDesc) metaDesc.setAttribute('content', descriptions[lang]);
    const nextLabel = lang === 'es' ? 'EN' : 'ES';
    if (langBtn) langBtn.textContent = nextLabel;
    if (langBtnMobile) langBtnMobile.textContent = nextLabel;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    window.DELATOUCH_LANG = lang;
  }

  let current = 'en';
  try { current = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) {}
  applyLang(current);

  function toggle() {
    current = current === 'es' ? 'en' : 'es';
    applyLang(current);
  }
  if (langBtn) langBtn.addEventListener('click', toggle);
  if (langBtnMobile) langBtnMobile.addEventListener('click', toggle);
})();


// Respect users who've asked for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;

if (!prefersReducedMotion) {

  // --- Smooth scroll (Lenis) ---
  lenis = new Lenis({ autoRaf: false });
  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // --- One orchestrated hero entrance ---
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-title .line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
    .from('.hero-tags', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-bio', { y: 20, opacity: 0, duration: 0.7 }, '-=0.55')
    .from('.hero-lens', { scale: 0.85, opacity: 0, duration: 1.1 }, '-=0.8');

  // subtle parallax on the hero lens as you scroll away from the hero
  gsap.to('.hero-lens', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // --- Reveal-on-scroll for the rest of the page ---
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.closest('.hero')) return; // el hero ya tiene su propia timeline
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // --- DTH portrait: gentle idle drift ---
  gsap.to('.dth-portrait', {
    y: -8,
    duration: 2.6,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.style.opacity = 1;
    el.style.transform = 'none';
  });
}


// --- Ir a una sección (respeta Lenis si está activo) ---
function scrollToTarget(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: -70, duration: 1.1 });
  } else {
    target.scrollIntoView({ block: 'start' });
  }
  history.replaceState(null, '', hash);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#' || !document.querySelector(hash)) return;
    e.preventDefault();
    scrollToTarget(hash);
  });
});


// --- Menú móvil ---
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const topbar = document.querySelector('.topbar');

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('is-open');
  document.body.classList.remove('nav-open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  if (lenis) lenis.start();
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
    // sin esto el fondo sigue haciendo scroll por detrás del menú abierto
    if (lenis) { isOpen ? lenis.stop() : lenis.start(); }
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });
}


// --- Desplegable Index ---
const indexBtn = document.getElementById('index-btn');
const indexMenu = document.getElementById('index-menu');

function closeIndexMenu() {
  if (!indexMenu) return;
  indexMenu.classList.remove('is-open');
  if (indexBtn) indexBtn.setAttribute('aria-expanded', 'false');
  if (topbar) topbar.classList.remove('is-solid');
}

if (indexBtn && indexMenu) {
  indexBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = indexMenu.classList.toggle('is-open');
    indexBtn.setAttribute('aria-expanded', String(isOpen));
    // el header va en mix-blend-mode: si no se desactiva, el desplegable
    // se funde con el fondo y no se lee
    if (topbar) topbar.classList.toggle('is-solid', isOpen);
  });
  indexMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeIndexMenu);
  });
  document.addEventListener('click', (e) => {
    if (!indexMenu.contains(e.target) && e.target !== indexBtn) closeIndexMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeIndexMenu();
  });
}


// --- Marcar en el menú la sección en la que estás ---
(function () {
  const links = Array.from(document.querySelectorAll('.topnav a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map();
  links.forEach((l) => {
    const sec = document.querySelector(l.getAttribute('href'));
    if (sec) map.set(sec, l);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = map.get(entry.target);
      if (!link || !entry.isIntersecting) return;
      links.forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, sec) => io.observe(sec));
})();


// --- Formulario de contacto ---
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const statusEl = document.getElementById('form-status');
  const button = document.getElementById('contact-submit');

  const T = {
    sending: { en: 'Sending…', es: 'Enviando…' },
    ok: { en: 'Thanks — message sent.', es: 'Gracias — mensaje enviado.' },
    error: { en: 'Something went wrong. Write me at ' + CONTACT_EMAIL, es: 'Algo ha fallado. Escríbeme a ' + CONTACT_EMAIL },
    mail: { en: 'Opening your mail app…', es: 'Abriendo tu aplicación de correo…' }
  };
  const t = (key) => T[key][window.DELATOUCH_LANG === 'es' ? 'es' : 'en'];

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.add('is-visible');
    statusEl.classList.toggle('is-error', !!isError);
  }

  if (FORMSPREE_ID) form.setAttribute('action', 'https://formspree.io/f/' + FORMSPREE_ID);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form._gotcha && form._gotcha.value) return; // bot
    const data = new FormData(form);

    // Sin Formspree configurado: se abre el correo del visitante con todo escrito.
    if (!FORMSPREE_ID) {
      const subject = 'delatouch.com — ' + (data.get('name') || '');
      const body = (data.get('message') || '') + '\n\n— ' + (data.get('name') || '') + ' (' + (data.get('email') || '') + ')';
      setStatus(t('mail'), false);
      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      return;
    }

    if (button) button.disabled = true;
    setStatus(t('sending'), false);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        setStatus(t('ok'), false);
      } else {
        setStatus(t('error'), true);
      }
    } catch (err) {
      setStatus(t('error'), true);
    } finally {
      if (button) button.disabled = false;
    }
  });
})();
