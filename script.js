// Respect users who've asked for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {

  // --- Smooth scroll (Lenis) ---
  const lenis = new Lenis({ autoRaf: false });
  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // --- One orchestrated hero entrance ---
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-title .line', { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 })
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-lens', { scale: 0.85, opacity: 0, duration: 1.1 }, '-=0.8')
    .to('.topbar', { opacity: 1, duration: 0.4 }, '-=0.6');

  // subtle parallax on the hero lens as you scroll away from the hero
  gsap.to('.hero-lens', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // --- Reveal-on-scroll for the rest of the page (single mechanism, no per-card fuss) ---
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.closest('.hero')) return; // hero already handled by its own timeline
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // --- DTH avatar: gentle idle tilt, echoes a camera/robot "looking around" ---
  gsap.to('.dth-avatar', {
    rotate: 3,
    duration: 2.4,
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

// --- Mobile menu toggle (independent of reduced-motion branch above) ---
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
