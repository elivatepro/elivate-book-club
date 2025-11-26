document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach((el, index) => {
    el.style.transitionDelay = `${index * 40}ms`;
    observer.observe(el);
  });
});

// Waitlist modal for membership/paywall CTAs
(function() {
  const triggers = Array.from(document.querySelectorAll('[data-waitlist="true"]'));
  if (!triggers.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'waitlist-overlay';
  overlay.innerHTML = `
    <div class="waitlist-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
      <h3 id="waitlist-title">Membership Waitlist</h3>
      <p>We\u2019re not accepting new members right now. Leave your email and we\u2019ll notify you when we open spots.</p>
      <form>
        <label class="sr-only" for="waitlist-email">Email</label>
        <input id="waitlist-email" name="email" type="email" placeholder="you@example.com" required />
        <div class="waitlist-actions">
          <button type="submit" class="waitlist-btn">Notify Me</button>
          <button type="button" class="waitlist-btn secondary" data-close>Close</button>
        </div>
        <p class="waitlist-status" style="margin:0; font-size:12px; color:#2C2B28;"></p>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  const form = overlay.querySelector('form');
  const status = overlay.querySelector('.waitlist-status');
  const closeBtn = overlay.querySelector('[data-close]');
  const emailInput = overlay.querySelector('input[type="email"]');

  function openModal() {
    overlay.classList.add('active');
    status.textContent = '';
    emailInput.value = '';
    emailInput.focus();
  }

  function closeModal() {
    overlay.classList.remove('active');
  }

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thanks! We\u2019ll notify you when membership opens.';
    setTimeout(closeModal, 1200);
  });
})();

// Mobile nav
(function() {
  const header = document.querySelector('header');
  if (!header) return;
  const nav = header.querySelector('nav');
  if (!nav) return;

  const toggle = document.createElement('button');
  toggle.className = 'mobile-menu-button md:hidden';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.innerHTML = '<span></span>';
  nav.parentNode.insertBefore(toggle, nav);

  const links = Array.from(nav.querySelectorAll('a')).map((a) => {
    const href = a.getAttribute('href') || '#';
    const text = a.textContent || '';
    return `<a href="${href}">${text}</a>`;
  }).join('');

  const cta = header.querySelector('[data-waitlist="true"]');
  const ctaText = cta ? (cta.textContent || 'Join') : 'Join';
  const ctaHref = cta ? (cta.getAttribute('href') || '#') : '#';
  const ctaAttr = cta && cta.hasAttribute('data-waitlist') ? 'data-waitlist="true"' : '';

  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  overlay.innerHTML = `
    <div class="mobile-menu-panel">
      <button class="close-btn" aria-label="Close menu">×</button>
      <div class="mobile-menu-links">
        ${links}
      </div>
      <div class="mobile-menu-cta">
        <a href="${ctaHref}" class="btn btn-primary" ${ctaAttr}>${ctaText}</a>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const panel = overlay.querySelector('.mobile-menu-panel');
  const closeBtn = overlay.querySelector('.close-btn');

  function openMenu() {
    overlay.classList.add('active');
    panel.classList.add('active');
  }
  function closeMenu() {
    overlay.classList.remove('active');
    panel.classList.remove('active');
  }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });
})();
