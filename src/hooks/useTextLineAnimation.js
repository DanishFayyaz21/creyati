// src/hooks/useTextLineAnimation.js
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // added
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const splitLinesByLayout = (element) => {
  if (!element) return;
  const original = element.dataset.original || element.textContent.trim();
  element.dataset.original = original;

  element.innerHTML = "";
  const words = original.split(" ");
  words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = w;
    element.appendChild(span);
    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });

  void element.offsetHeight;

  const containerRect = element.getBoundingClientRect();
  const spans = Array.from(element.querySelectorAll("span.word"));
  const tops = [];
  const groups = [];

  spans.forEach((sp) => {
    const top = Math.round(sp.getBoundingClientRect().top - containerRect.top);
    const idx = tops.indexOf(top);
    if (idx === -1) {
      tops.push(top);
      groups.push([sp]);
    } else {
      groups[idx].push(sp);
    }
  });

  element.innerHTML = "";
  groups.forEach((group, gi) => {
    const wrapper = document.createElement("span");
    wrapper.className = "line";
    wrapper.style.display = "inline-block";
    wrapper.style.whiteSpace = "nowrap";
    wrapper.style.verticalAlign = "top";
    wrapper.style.backgroundImage = `linear-gradient(var(--text-fill-color), var(--text-fill-color))`;
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundSize = "0% 100%";
    wrapper.style.WebkitBackgroundClip = "text";
    wrapper.style.WebkitTextFillColor = "transparent";

    group.forEach((s, si) => {
      wrapper.appendChild(s);
      if (si < group.length - 1) {
        wrapper.appendChild(document.createTextNode(" "));
      }
    });

    element.appendChild(wrapper);
    if (gi < groups.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
};

export const useTextLineAnimation = () => {
  const resizeTimer = useRef(null);
  const triggersRef = useRef([]);
  const location = useLocation(); // track route changes

  const animateLines = (element, delay = 0, duration = 1.2) => {
    if (!element) return;
    const lines = element.querySelectorAll(".line");
    if (!lines.length) return;

    gsap.killTweensOf(lines);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
      animation: gsap.to(lines, {
        backgroundSize: "100% 100%",
        duration,
        ease: "power2.out",
        stagger: 0.25,
        delay,
      }),
    });

    triggersRef.current.push(trigger);
  };

  const init = () => {
    triggersRef.current.forEach((st) => st.kill());
    triggersRef.current = [];

    document.querySelectorAll("h2, h3, h4, h5, h6, p").forEach((el) => {
      splitLinesByLayout(el);

      if (/^h[2-6]$/i.test(el.tagName)) {
        animateLines(el, 0, 2);
      } else {
        animateLines(el, 0.15, 1.2);
      }
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    init();

    const onResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(init, 120);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer.current);
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, [location.pathname]); // re-run when route changes
};
