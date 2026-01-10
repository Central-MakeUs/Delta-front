"use client";

import clsx from "clsx";
import Image from "next/image";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import * as s from "@/app/my/components/hero-background/hero-background.css";

const useViewportMaxWidth = (maxWidthPx: number, defaultMatched = false) => {
  const query = useMemo(() => `(max-width: ${maxWidthPx}px)`, [maxWidthPx]);

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return defaultMatched;
    return window.matchMedia(query).matches;
  }, [query, defaultMatched]);

  const getServerSnapshot = useCallback(() => defaultMatched, [defaultMatched]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia(query);
      const handler = () => onStoreChange();
      if (mq.addEventListener) {
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
      }
      return () => {};
    },
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

const HeroBackground = () => {
  const isNarrow = useViewportMaxWidth(390);

  return (
    <div className={s.wrap} aria-hidden>
      <div className={s.pinwheel}>
        <Image src="/my-page/hero-pinwheel.svg" alt="" fill sizes="8rem" />
      </div>
      <div className={clsx(s.diagonal1, isNarrow && s.diagonal1Narrow)}>
        <Image src="/my-page/hero-diagonal-1.svg" alt="" fill sizes="33.8rem" />
      </div>
      <div className={s.diagonal2}>
        <Image src="/my-page/hero-diagonal-2.svg" alt="" fill sizes="25.0rem" />
      </div>
    </div>
  );
};

export default HeroBackground;
