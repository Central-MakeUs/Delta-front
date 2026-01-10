"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as s from "@/app/my/components/hero-background/hero-background.css";

const useViewportMaxWidth = (maxWidthPx: number) => {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = () => setMatched(mq.matches);

    onChange();

    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [maxWidthPx]);

  return matched;
};

const HeroBackground = () => {
  const isNarrow = useViewportMaxWidth(390);

  return (
    <div className={s.wrap} aria-hidden>
      <div className={s.pinwheel}>
        <Image
          src="/my-page/hero-pinwheel.svg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className={clsx(s.diagonal1, isNarrow && s.diagonal1Narrow)}>
        <Image
          src="/my-page/hero-diagonal-1.svg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className={s.diagonal2}>
        <Image
          src="/my-page/hero-diagonal-2.svg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
    </div>
  );
};

export default HeroBackground;
