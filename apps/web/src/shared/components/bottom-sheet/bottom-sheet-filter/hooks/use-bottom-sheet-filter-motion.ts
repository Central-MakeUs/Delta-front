"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimationEvent, MouseEvent } from "react";

export const useBottomSheetFilterMotion = (params: {
  isOpen: boolean;
  onClose: () => void;
  closeAnimationMs: number;
}) => {
  const { isOpen, onClose, closeAnimationMs } = params;

  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const finalizeClose = useCallback(() => {
    clearCloseTimer();
    setIsClosing(false);
    onClose();
  }, [clearCloseTimer, onClose]);

  const requestClose = useCallback(() => {
    setIsClosing((prev) => {
      if (prev) return prev;

      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        finalizeClose();
      }, closeAnimationMs + 50);

      return true;
    });
  }, [clearCloseTimer, closeAnimationMs, finalizeClose]);

  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      requestClose();
    },
    [requestClose]
  );

  const handleSheetAnimationEnd = useCallback(
    (e: AnimationEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (!isClosing) return;
      finalizeClose();
    },
    [finalizeClose, isClosing]
  );

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  useEffect(() => {
    const shouldLock = isOpen || isClosing;
    if (!shouldLock) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    const shouldBind = isOpen || isClosing;
    if (!shouldBind) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing, requestClose]);

  const motionState = isClosing ? "closing" : "open";

  return {
    isClosing,
    requestClose,
    motionState,
    handleOverlayClick,
    handleSheetAnimationEnd,
  };
};
