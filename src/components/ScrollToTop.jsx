import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately scroll to top on route change
    window.scrollTo(0, 0);
    
    // Also set document elements to top for Lenis compatibility
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Refresh ScrollTrigger if present
    if (window.ScrollTrigger?.refresh) {
      requestAnimationFrame(() => window.ScrollTrigger.refresh(true));
    }
  }, [pathname]);

  return null;
}
