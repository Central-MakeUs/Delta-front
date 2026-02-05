"use client";

import { useEffect, useRef, useState } from "react";

export const useDeferredAnimateSeed = (deps: readonly unknown[]) => {
  const [seed, setSeed] = useState(0);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      setSeed((v) => v + 1);
    });

    return () => window.cancelAnimationFrame(raf);
  }, deps);

  return seed;
};
