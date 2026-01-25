import Chip from "@/shared/components/chip/chip";
import * as styles from "./header-section.css";
import type { WrongDetailSectionData } from "../../types";

interface HeaderSectionProps {
  title: WrongDetailSectionData["title"];
  subjectChip: WrongDetailSectionData["subjectChip"];
  chips: WrongDetailSectionData["chips"];
}

const HeaderSection = ({ title, subjectChip, chips }: HeaderSectionProps) => {
  return (
    <div className={styles.headerSection}>
      <Chip
        size="md"
        shape="pill"
        tone="solid"
        label={subjectChip}
        state="active"
      />
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.headerChips}>
          {chips.map((chip) => (
            <Chip
              key={chip.label}
              size="md"
              shape="square"
              label={chip.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
