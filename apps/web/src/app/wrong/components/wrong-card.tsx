import type { HTMLAttributes } from "react";
import Image, { type StaticImageData } from "next/image";

import Chip from "@/shared/components/chip/chip";
import SampleImg from "@/shared/assets/images/wrong-sample.png";
import * as s from "@/app/wrong/components/wrong-card.css";

type WrongCardProps = {
  title?: string;
  date?: string;
  imageSrc?: StaticImageData | string;
  imageAlt?: string;
  chips?: {
    primary: string;
    secondary: string[];
  };
} & Pick<HTMLAttributes<HTMLDivElement>, "onClick">;

const WrongCard = ({
  title = "공통수학1 문제",
  date = "2026.01.06",
  imageSrc = SampleImg,
  imageAlt = "오답 문제 이미지",
  chips = { primary: "공통수학1", secondary: ["다항식", "절댓값"] },
  onClick,
}: WrongCardProps) => {
  return (
    <div className={s.card({ clickable: Boolean(onClick) })} onClick={onClick}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={false}
        className={s.image}
        sizes="(max-width: 430px) 100vw, 430px"
      />

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
