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
  if (typeof window === "undefined") return 0;
  if (!document?.body) return 0;

  const envTop = readInsetPx("env(safe-area-inset-top)");
  const constantTop = readInsetPx("constant(safe-area-inset-top)");
  return Math.max(envTop, constantTop);
};

const NOTCH_INSET_TOP_THRESHOLD_PX = 40;

const computeHasNotch = () =>
  getSafeAreaInsetTopPx() >= NOTCH_INSET_TOP_THRESHOLD_PX;

export const useHasNotch = () => {
  const [hasNotch, setHasNotch] = useState(computeHasNotch);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const next = computeHasNotch();
      setHasNotch((prev) => (prev === next ? prev : next));
    };

    const handleViewportChange = () => {
      if (raf) window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };

    handleViewportChange();

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, []);

  return hasNotch;
};
