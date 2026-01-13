"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import splashLottie from "@/shared/assets/semo-splash.json";
import * as s from "@/shared/components/splash/splash.css";

const Splash = () => {
  const [visible, setVisible] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    lottieRef.current?.setSpeed(1.6);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={s.overlay}
      onAnimationEnd={() => setVisible(false)}
    >
      <Lottie
        lottieRef={lottieRef}
        autoplay
        loop={false}
        animationData={splashLottie}
        className={s.image}
      />
    </div>
  );
};

export default Splash;
