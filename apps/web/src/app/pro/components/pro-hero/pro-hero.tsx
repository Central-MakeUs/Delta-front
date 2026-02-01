"use client";

import * as s from "@/app/pro/components/pro-hero/pro-hero.css";
import Icon from "@/shared/components/icon/icon";
import Image from "next/image";

type Props = {
  onBack: () => void;
};

export const ProHero = ({ onBack }: Props) => {
  return (
    <header className={s.root}>
      <div className={s.backWrapper}>
        <button className={s.backButton} onClick={onBack} aria-label="뒤로가기">
          <Icon name="chevron" rotate={180} size={2.4} />
        </button>
      </div>

      <Image
        className={s.multiply}
        src="/login/multiply.svg"
        alt=""
        width={56}
        height={56}
        priority
      />
      <Image
        className={s.divide}
        src="/login/divide.svg"
        alt=""
        width={56}
        height={56}
        priority
      />

      <div className={s.center}>
        <p className={s.kicker}>세모만의</p>

        <div className={s.titleRow}>
          <h1 className={s.title}>성적 상승 공식</h1>
          <Icon name="arrow-up-right" size={4} />
        </div>
      </div>

      <div className={s.blocks}>
        <div className={s.blockSm} />
        <div className={s.blockMd} />
        <div className={s.blockLg} />
        <div className={s.blockXl} />
      </div>
    </header>
  );
};
