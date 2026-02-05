"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "@/shared/components/button/button/button";
import * as styles from "./bottom-sheet-terms.css";

export interface BottomSheetTermsProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  termsContent: string[];
  className?: string;
  overlayClassName?: string;
}

export const BottomSheetTerms = ({
  isOpen,
  onClose,
  onAgree,
  className,
  termsContent,
  overlayClassName,
}: BottomSheetTermsProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    const shouldLock = isOpen || isClosing;
    if (!shouldLock) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isClosing]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (isClosing) return;
    setIsClosing(true);
  };

  const handleSheetAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!isClosing) return;
    setIsClosing(false);
    onClose();
  };

  const handleAgree = () => {
    if (isClosing) return;
    onAgree();
    setIsClosing(true);
  };

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
  };

  useEffect(() => {
    const shouldBind = isOpen || isClosing;
    if (!shouldBind) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isClosing) return;
      setIsClosing(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isClosing]);

  useEffect(() => {
    if (!isOpen || isClosing) return;
    if (!bottomSheetRef.current) return;

    bottomSheetRef.current.focus();
  }, [isOpen, isClosing]);

  if (!shouldRender) return null;

  const motionState = isClosing ? "closing" : "open";

  return (
    <div
      className={clsx(styles.overlay, overlayClassName)}
      data-state={motionState}
      onClick={handleOverlayClick}
    >
      <div
        ref={bottomSheetRef}
        role="dialog"
        aria-modal="true"
        className={clsx(styles.bottomSheet, className)}
        data-state={motionState}
        onAnimationEnd={handleSheetAnimationEnd}
      >
        <div className={styles.contentContainer}>
          <div className={styles.termsContent}>
            <h2 className={styles.title}>세모에 가입하려면 동의가 필요해요.</h2>
            <div className={styles.termsText}>
              {termsContent.map((content, index) => (
                <p key={index}>{content}</p>
              ))}
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              label="전체 동의하기"
              size="48"
              tone="dark"
              fullWidth
              onClick={handleAgree}
              disabled={isClosing}
            />
            <button
              type="button"
              className={styles.cancelText}
              onClick={handleClose}
              disabled={isClosing}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheetTerms;
