"use client";

import type { KeyboardEventHandler } from "react";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import Chip from "@/shared/components/chip/chip";
import * as s from "@/app/wrong/(list)/components/wrong-card.css";
import Icon from "@/shared/components/icon/icon";

export type WrongCardProps = {
  title: string;
  date: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  chips: {
    primary: string;
    secondary: string[];
  };
  href: string;
  isCompleted?: boolean;
};

const WrongCard = ({
  title,
  date,
  imageSrc,
  imageAlt,
  chips,
  href,
  isCompleted,
}: WrongCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <div
      className={s.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={false}
        className={s.image}
        sizes="(max-width: 430px) 100vw, 430px"
        unoptimized
      />

      {isCompleted !== undefined && (
        <div className={s.statusChip}>
          <Icon name={isCompleted ? "check-mark" : "wrong-edit"} size={1.6} />
          {isCompleted ? "오답 완료" : "오답 전"}
        </div>
      )}

      <div className={s.aboutSection}>
        <div className={s.chipRow}>
          <Chip label={chips.primary} size="md" shape="pill" tone="solid" />
          <div className={s.subChipRow}>
            {chips.secondary.map((label) => (
              <Chip
                key={label}
                label={label}
                size="xs"
                shape="square"
                tone="surface"
              />
            ))}
          </div>
        </div>

        <div className={s.titleSection}>
          <span className={s.title}>{title}</span>
          <span className={s.date}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default WrongCard;
