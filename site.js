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
