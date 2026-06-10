/* ============================================================
   Pâtisserie Chocolaterie ARTK - Main JS
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll ── */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Hamburger / Drawer ── */
  const hamburger     = document.getElementById('hamburger');
  const drawer        = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose   = document.getElementById('drawerClose');

  const openDrawer = () => {
    drawer.classList.add('open');
    drawerOverlay.classList.add('active');
    hamburger.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  drawerOverlay.addEventListener('click', closeDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ── Hero Swiper ── */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
    });
  }

  /* ── AOS ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer   = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
      });

      // Toggle clicked
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
