export function hardScrollToTop() {
    const list = [
      document.querySelector("[data-scroll-container]"),
      document.querySelector("#smooth-wrapper"),
      document.querySelector("#smooth-content"),
      document.querySelector("#lenis-root"),
      document.scrollingElement,
      document.documentElement,
      document.body,
    ].filter(Boolean);
  
    list.forEach(el => { try { el.scrollTop = 0; } catch {} });
    try { window.scrollTo(0, 0); } catch {}
    if (window.ScrollTrigger?.refresh) {
      requestAnimationFrame(() => window.ScrollTrigger.refresh(true));
    }
  }
  