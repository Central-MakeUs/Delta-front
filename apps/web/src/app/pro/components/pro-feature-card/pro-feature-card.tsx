"use client";

import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import type { ProFeatureItem } from "@/app/pro/constants/pro-features";
import { useRevealOnScroll } from "@/app/pro/hooks/use-reveal-on-scroll";
import { ProIllustration } from "@/app/pro/components/pro-feature-card/pro-illustration";
import * as s from "@/app/pro/components/pro-feature-card/pro-feature-card.css";

type Props = {
  item: ProFeatureItem;
  index: number;
};

export const ProFeatureCard = ({ item, index }: Props) => {
  const { ref, revealed } = useRevealOnScroll({
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <div
      ref={ref}
      className={clsx(
        s.card,
        s.side[item.ribbonSide],
        s.revealBase,
        revealed && s.revealOn
      )}
      style={{ transitionDelay: `${Math.min(index * 80, 240)}ms` }}
    >
      <div className={s.ribbon}>
        <div className={s.crown} aria-hidden="true">
          <Icon name="crown" size={2} />
        </div>
        <span className={s.ribbonText}>{item.proLabel}</span>
      </div>

      <div className={s.text}>
        <h3 className={s.head}>
          {item.title}
          <span className={s.en}>({item.titleEn})</span>
        </h3>
        <p className={s.desc}>{item.desc}</p>
      </div>

      <div className={s.illu}>
        {item.badgeText && <span className={s.badge}>{item.badgeText}</span>}
        <ProIllustration variant={item.illustration} />
      </div>
    </div>
  );
};
