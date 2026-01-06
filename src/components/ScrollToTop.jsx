import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ scroller }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const scrollToTop = () => {
      const container =
        (scroller && document.querySelector(scroller)) ||
        document.querySelector("[data-scroll-container]") ||
        document.querySelector("#smooth-wrapper") ||
        document.querySelector("#lenis-root") ||
        document.scrollingElement ||
        document.documentElement;

      if (container) {
        if ("scrollTo" in container) {
          container.scrollTo({ top: 0, behavior: "instant" });
          return;
        } else {
          container.scrollTop = 0;
          return;
        }
      }

      // Fallback
      try {
        window.scrollTo({ top: 0, behavior: "instant" });
      } catch {}

      // Refresh ScrollTrigger if present
      if (window.ScrollTrigger?.refresh) {
        requestAnimationFrame(() => window.ScrollTrigger.refresh(true));
      }
    };

    // Slight delay to ensure DOM is rendered
    const timeout = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeout);
  }, [pathname, scroller]);

  return null;
}
