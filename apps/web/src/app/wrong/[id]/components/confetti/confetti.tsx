"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import confettiLottie from "@/shared/assets/lottie/confetti.json";
import * as s from "./confetti.css";

type ConfettiProps = {
  isOpen: boolean;
  playId: number;
  className?: string;
  onComplete?: () => void;
};

export const Confetti = ({
  isOpen,
  playId,
  className,
  onComplete,
}: ConfettiProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!isOpen) return;

    const item = lottieRef.current?.animationItem;
    if (!item) return;

    const handleComplete = () => onComplete?.();

    item.addEventListener("complete", handleComplete);

    return () => {
      item.removeEventListener("complete", handleComplete);
    };
  }, [isOpen, playId, onComplete]);

  if (!isOpen) return null;

  return (
    <div className={clsx(s.overlay, className)} aria-hidden>
      <Lottie
        key={playId}
        lottieRef={lottieRef}
        autoplay
        loop={false}
        animationData={confettiLottie}
        onDOMLoaded={() => lottieRef.current?.setSpeed(1.5)}
        className={s.lottie}
      />
    </div>
  );
};

export default Confetti;
