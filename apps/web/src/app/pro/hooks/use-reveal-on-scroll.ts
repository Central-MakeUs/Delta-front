"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export const useRevealOnScroll = (options?: Options) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const once = options?.once ?? true;
    const rootMargin = options?.rootMargin ?? "0px 0px -10% 0px";
    const threshold = options?.threshold ?? 0.15;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setRevealed(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setRevealed(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.once, options?.rootMargin, options?.threshold]);

  return { ref, revealed };
};
