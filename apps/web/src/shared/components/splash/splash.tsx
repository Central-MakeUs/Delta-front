"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import splashLottie from "@/shared/assets/lottie/semo-splash.json";
import * as s from "@/shared/components/splash/splash.css";

type SplashProps = {
  onDone?: () => void;
};

const SPLASH_SUPPRESS_ONCE_KEY = "splash:suppress-once";

const getSessionItem = (key: string) => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(key);
};

const removeSessionItem = (key: string) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(key);
};

const Splash = ({ onDone }: SplashProps) => {
  const [visible, setVisible] = useState(true);

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const doneRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const onDoneRef = useRef<SplashProps["onDone"]>(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    onDoneRef.current?.();
  }, []);

  useLayoutEffect(() => {
    const suppressOnce = getSessionItem(SPLASH_SUPPRESS_ONCE_KEY) === "1";
    if (!suppressOnce) return;

    removeSessionItem(SPLASH_SUPPRESS_ONCE_KEY);

    rafRef.current = window.requestAnimationFrame(() => {
      finish();
    });

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div aria-hidden className={s.overlay} onAnimationEnd={finish}>
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
