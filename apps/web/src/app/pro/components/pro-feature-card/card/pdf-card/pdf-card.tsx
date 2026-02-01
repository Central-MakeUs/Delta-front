"use client";

import Image from "next/image";
import * as s from "./pdf-card.css";

const PdfCard = () => {
  return (
    <div className={s.root}>
      <div className={s.pillRow}>
        <div className={s.pill}>
          <span className={s.pillText}>개인 맞춤형 오답</span>
        </div>
      </div>

      <div className={s.artwork}>
        <div className={s.pdfWrap}>
          <Image
            src="/pro/02-pdf.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 430px) 66px, 66px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={s.arrowWrap}>
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
