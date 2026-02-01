"use client";

import Image from "next/image";
import * as s from "./expansion-card.css";

const ExpansionCard = () => {
  return (
    <div className={s.root}>
      <div className={s.pillRow}>
        <div className={s.pill}>
          <span className={s.pillText}>개인 맞춤형 문제</span>
        </div>
      </div>

      <div className={s.artwork}>
        <Image
          src="/pro/04-expansion.svg"
          alt=""
          fill
          priority
          sizes="10rem"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default ExpansionCard;
