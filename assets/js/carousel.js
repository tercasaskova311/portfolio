// assets/js/carousel.js
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('[data-action="prev"]');
  const nextBtn = carousel.querySelector('[data-action="next"]');

  let current = 0;
  let timer = null;
  const interval = parseInt(carousel.dataset.interval || 4000, 10);
  const autoplay = carousel.dataset.autoplay !== 'false';

  // build dots
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to slide ${i+1}`);
    btn.dataset.index = i;
    if (i === 0) btn.classList.add('is-active');
    dotsContainer.appendChild(btn);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  function show(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === index);
      // update aria-hidden for screen readers
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    current = index;
  }

  function next() { show((current + 1) % slides.length); }
  function prev() { show((current - 1 + slides.length) % slides.length); }

  // wire controls
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

  // dots click
  dots.forEach(d => d.addEventListener('click', (e) => {
    const idx = parseInt(e.currentTarget.dataset.index, 10);
    show(idx);
    resetTimer();
  }));

  // keyboard support
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); resetTimer(); }
    if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
  });

  // autoplay timer
  function startTimer() {
    if (!autoplay) return;
    stopTimer();
    timer = setInterval(() => next(), interval);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function resetTimer() { stopTimer(); startTimer(); }

  // pause when hovered or focused for a11y
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', startTimer);

  // init
  show(0);
  startTimer();

  // safety: if slides change dynamically, ensure dots reflect that
  // (not required for static pages)
});
