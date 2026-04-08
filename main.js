/* ========================================================
   PEREGRIN — Interactions
   ======================================================== */

function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
  });
}

function initHeroScrollFade() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
        const content = hero.querySelector('.hero__content');
        if (content) {
          content.style.opacity = 1 - progress * 1.8;
          content.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        }
        const indicator = hero.querySelector('.hero__scroll-indicator');
        if (indicator) indicator.style.opacity = 1 - progress * 4;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 350px; height: 350px; border-radius: 50%;
    pointer-events: none; z-index: 0;
    background: radial-gradient(circle, rgba(184,157,106,0.025) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.8s cubic-bezier(0.16,1,0.3,1), top 0.8s cubic-bezier(0.16,1,0.3,1);
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initHeroScrollFade();
  initCursorGlow();
});
