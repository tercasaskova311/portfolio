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

  // --- set slide height dynamically ---
  function setSlideHeight() {
    const carouselHeight = window.innerHeight * 0.6; // 60% of viewport height
    slides.forEach(slide => slide.style.height = `${carouselHeight}px`);
  }
  window.addEventListener('resize', setSlideHeight);
  setSlideHeight(); // initial

  // --- build dots ---
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.dataset.index = i;
    if (i === 0) btn.classList.add('is-active');
    dotsContainer.appendChild(btn);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  // --- show a slide ---
  function show(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('is-active', i === index);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    current = index;
  }

  function next() { show((current + 1) % slides.length); }
  function prev() { show((current - 1 + slides.length) % slides.length); }

  // --- wire controls ---
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

  dots.forEach(d => d.addEventListener('click', (e) => {
    const idx = parseInt(e.currentTarget.dataset.index, 10);
    show(idx);
    resetTimer();
  }));

  // --- keyboard support ---
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); resetTimer(); }
    if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
  });

  // --- autoplay timer ---
  function startTimer() {
    if (!autoplay) return;
    stopTimer();
    timer = setInterval(next, interval);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function resetTimer() { stopTimer(); startTimer(); }

  // --- pause when hovered/focused ---
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', startTimer);

  // --- initialize ---
  show(0);
  startTimer();
});
