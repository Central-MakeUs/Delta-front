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

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setRevealed(true);
          if (options?.once ?? true) obs.unobserve(el);
        } else if (!(options?.once ?? true)) {
          setRevealed(false);
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
        threshold: options?.threshold ?? 0.15,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.once, options?.rootMargin, options?.threshold]);

  return { ref, revealed };
};
