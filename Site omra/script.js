/* ═══════════════════════════════════════════════════════════════════════════
   MA CONSEILLÈRE OMRA — JavaScript principal
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Calendly ────────────────────────────────────────────────────────────────── */
function openCalendly() {
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({ url: 'https://calendly.com/consultanteomrahajj/30min' });
  } else {
    window.open('https://calendly.com/consultanteomrahajj/30min', '_blank');
  }
  return false;
}

/* ── Navbar scroll ───────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}, { passive: true });

/* ── Mobile menu ─────────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu?.classList.toggle('open');
  document.body.style.overflow = navMenu?.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Smooth scroll for anchor links ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── FAQ Accordion ───────────────────────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer')?.classList.remove('open');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      answer?.classList.add('open');
    }
  });
});

/* ── Scroll reveal ───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Scroll-to-top button ────────────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn?.classList.add('visible');
  } else {
    scrollTopBtn?.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Generate hero stars ─────────────────────────────────────────────────────── */
function generateStars() {
  const container = document.querySelector('.hero-stars');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(201,168,76,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }

  // Add CSS for twinkle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.4); }
    }
  `;
  document.head.appendChild(style);
}
generateStars();

/* ── Contact form (simulation — remplacer par EmailJS ou un backend) ─────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = form?.querySelector('button[type="submit"]');

  if (!form || !success || !btn) return;

  // Simulate sending
  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    success.style.display = 'block';
    btn.textContent = 'Envoyer mon message ✉️';
    btn.disabled = false;
    setTimeout(() => { success.style.display = 'none'; }, 6000);
  }, 1200);
}

/* ── Active nav link on scroll ───────────────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(section => sectionObserver.observe(section));

/* ── Counter animation for hero stats ───────────────────────────────────────── */
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat strong').forEach(el => {
      const text = el.textContent;
      const num  = parseInt(text.replace(/\D/g, ''), 10);
      const suf  = text.replace(/[\d]/g, '');
      if (!isNaN(num)) animateCounter(el, num, suf);
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Checklist lead magnet form ──────────────────────────────────────────────── */
function handleChecklistSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('checklist-form');
  const success = document.getElementById('checklist-success');
  const btn     = form?.querySelector('button[type="submit"]');
  const prenom  = document.getElementById('cl-prenom');
  const email   = document.getElementById('cl-email');

  if (!form || !success || !btn || !prenom || !email) return;

  // Validation
  let valid = true;
  [prenom, email].forEach(el => el.style.borderColor = '');

  if (!prenom.value.trim()) {
    prenom.style.borderColor = '#e74c3c';
    prenom.focus();
    valid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    email.style.borderColor = '#e74c3c';
    if (valid) email.focus();
    valid = false;
  }
  if (!valid) return;

  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  const data = new FormData();
  data.append('prenom', prenom.value.trim());
  data.append('email', email.value.trim());
  data.append('_subject', 'Demande checklist Omra — ' + prenom.value.trim());
  data.append('_replyto', email.value.trim());

  fetch('https://formspree.io/f/consultanteomrahajj@gmail.com', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(() => {
    form.style.display = 'none';
    success.style.display = 'block';
  })
  .catch(() => {
    form.style.display = 'none';
    success.style.display = 'block';
  })
  .finally(() => {
    btn.textContent = '📥 Envoyer ma checklist gratuite';
    btn.disabled = false;
  });
}

/* ── FAQ question form ───────────────────────────────────────────────────────── */
function handleFaqQuestion(e) {
  e.preventDefault();
  const form    = document.getElementById('faq-question-form');
  const success = document.getElementById('faq-question-success');
  const btn     = form?.querySelector('button[type="submit"]');
  const prenom  = document.getElementById('faq-prenom');
  const email   = document.getElementById('faq-email');
  const message = document.getElementById('faq-message');

  if (!form || !success || !btn || !prenom || !email || !message) return;

  let valid = true;
  [prenom, email, message].forEach(el => el.style.borderColor = '');

  if (!prenom.value.trim()) { prenom.style.borderColor = '#e74c3c'; prenom.focus(); valid = false; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    email.style.borderColor = '#e74c3c';
    if (valid) email.focus();
    valid = false;
  }
  if (!message.value.trim()) { message.style.borderColor = '#e74c3c'; if (valid) message.focus(); valid = false; }
  if (!valid) return;

  btn.textContent = 'Envoi en cours…';
  btn.disabled = true;

  const data = new FormData();
  data.append('prenom', prenom.value.trim());
  data.append('email', email.value.trim());
  data.append('message', message.value.trim());
  data.append('_subject', 'Question FAQ — ' + prenom.value.trim());
  data.append('_replyto', email.value.trim());

  fetch('https://formspree.io/f/consultanteomrahajj@gmail.com', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(() => { form.style.display = 'none'; success.style.display = 'block'; })
  .catch(() => { form.style.display = 'none'; success.style.display = 'block'; })
  .finally(() => { btn.textContent = 'Envoyer ma question →'; btn.disabled = false; });
}

/* ── Year in footer ──────────────────────────────────────────────────────────── */
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
