"use client";

import { useEffect, useState } from "react";

const readInsetPx = (value: string) => {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.paddingTop = value;
  document.body.appendChild(el);

  const v = Number.parseFloat(getComputedStyle(el).paddingTop || "0");
  el.remove();

  return Number.isFinite(v) ? v : 0;
};

const getSafeAreaInsetTopPx = () => {
  const envTop = readInsetPx("env(safe-area-inset-top)");
  const constantTop = readInsetPx("constant(safe-area-inset-top)");
  return Math.max(envTop, constantTop);
};

export const useHasNotch = () => {
  const [hasNotch, setHasNotch] = useState(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const insetTop = getSafeAreaInsetTopPx();
      setHasNotch(insetTop >= 40);
    };

    raf = window.requestAnimationFrame(update);

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return hasNotch;
};
