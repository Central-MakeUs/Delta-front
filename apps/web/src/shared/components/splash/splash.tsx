"use client";

import { useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import splashLottie from "@/shared/assets/lottie/semo-splash.json";
import * as s from "@/shared/components/splash/splash.css";

const Splash = () => {
  const [visible, setVisible] = useState(true);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

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
        onDOMLoaded={() => lottieRef.current?.setSpeed(1.5)}
        className={s.image}
      />
    </div>
  );
};

export default Splash;
