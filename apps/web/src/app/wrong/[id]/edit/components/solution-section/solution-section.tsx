import { TextField } from "@/shared/components/text-field/text-field";
import * as styles from "./solution-section.css";

export interface SolutionSectionProps {
  solution: string;
  onSolutionChange: (value: string) => void;
}

export const SolutionSection = ({
  solution,
  onSolutionChange,
}: SolutionSectionProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>풀이</h2>
      <div className={styles.textField}>
        <TextField
          placeholder="풀이를 입력하세요"
          value={solution}
          onChange={(e) => onSolutionChange(e.target.value)}
          fullWidth
        />
      </div>
    </section>
  );
};

