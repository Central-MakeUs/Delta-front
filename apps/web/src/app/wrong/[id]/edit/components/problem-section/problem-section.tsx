import Image from "next/image";
import Chip from "@/shared/components/chip/chip";
import * as styles from "./problem-section.css";
import { WrongDetailData } from "../../../components/mocks/wrong-dummy";

export const ProblemSection = ({
  id,
  title,
  subjectChip,
  imagePath,
  chips,
}: WrongDetailData) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Chip
          key={id}
          label={subjectChip}
          size="md"
          shape="pill"
          tone="solid"
          className={styles.chip}
        />
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.metaChips}>
            {chips.map((chip) => (
              <Chip
                key={chip.label}
                label={chip.label}
                size="md"
                shape="square"
                tone="surface"
              />
            ))}
          </div>
        </div>
      </div>
      <Image
        src={imagePath}
        alt="문제 이미지"
        width={358}
        height={238}
        className={styles.image}
        unoptimized
      />
    </section>
  );
};
