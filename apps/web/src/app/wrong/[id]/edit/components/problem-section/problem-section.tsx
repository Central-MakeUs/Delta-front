import Image from "next/image";
import Chip from "@/shared/components/chip/chip";
import * as styles from "./problem-section.css";

export interface ProblemSectionProps {
  count: number;
  title: string;
  wrongCount: number;
  correctCount: number;
  imageUrl: string;
}

export const ProblemSection = ({
  count,
  title,
  wrongCount,
  correctCount,
  imageUrl,
}: ProblemSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Chip
          label={`${count}개`}
          size="md"
          shape="pill"
          tone="solid"
          disabled
          className={styles.chip}
        />
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.metaChips}>
            <Chip
              label={`${wrongCount}개`}
              size="md"
              shape="square"
              tone="surface"
              disabled
            />
            <Chip
              label={`${correctCount}개`}
              size="md"
              shape="square"
              tone="surface"
              disabled
            />
          </div>
        </div>
      </div>
      <Image
        src={imageUrl}
        alt="문제 이미지"
        width={358}
        height={238}
        className={styles.image}
        unoptimized
      />
    </section>
  );
};
