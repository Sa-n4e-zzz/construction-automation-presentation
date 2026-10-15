(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = [...document.querySelectorAll('[data-reveal]')];
  if (!elements.length) return;

  try {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.05 });

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * .9) {
        element.classList.add('is-visible');
      } else {
        observer.observe(element);
      }
    }
    document.documentElement.classList.add('motion-ready');
  } catch {
    document.documentElement.classList.remove('motion-ready');
  }
})();
