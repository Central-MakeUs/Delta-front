"use client";

import { useEffect, useState } from "react";

export const useDelayedVisible = (isActive: boolean, delayMs: number) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) return undefined;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      clearTimeout(timer);
      setIsVisible(false);
    };
  }, [isActive, delayMs]);

  return isActive && isVisible;
};

export default useDelayedVisible;
