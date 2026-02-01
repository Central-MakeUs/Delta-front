"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as s from "./pdf-card.css";

const PdfCard = () => {
  const [entered, setEntered] = useState(false);
  const [tapping, setTapping] = useState(false);

  const offRef = useRef<number | null>(null);
  const bootRef = useRef<number | null>(null);

  const triggerTap = () => {
    setTapping(false);

    window.setTimeout(() => {
      setTapping(true);
    }, 20);

    if (offRef.current) window.clearTimeout(offRef.current);
    offRef.current = window.setTimeout(() => setTapping(false), 900);
  };

  useEffect(() => {
    bootRef.current = window.setTimeout(() => {
      setEntered(true);
      triggerTap();
    }, 2000);

    return () => {
      if (bootRef.current) window.clearTimeout(bootRef.current);
      if (offRef.current) window.clearTimeout(offRef.current);
    };
  }, []);

  return (
    <div className={s.root}>
      <div className={s.pillRow}>
        <div className={s.pill}>
          <span className={s.pillText}>개인 맞춤형 오답</span>
        </div>
      </div>

      <div
        className={s.artwork}
        onPointerEnter={triggerTap}
        onPointerDown={triggerTap}
      >
        <div
          className={clsx(s.pdfWrap, entered && s.enterOn, tapping && s.tapPdf)}
        >
          <Image
            src="/pro/02-pdf.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 430px) 66px, 66px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div
          className={clsx(
            s.arrowWrap,
            entered && s.enterOn,
            tapping && s.tapArrow
          )}
        >
          <Image
            src="/pro/02-arrow.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 430px) 78px, 78px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
