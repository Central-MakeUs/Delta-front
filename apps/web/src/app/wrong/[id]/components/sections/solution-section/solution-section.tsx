import { Button } from "@/shared/components/button/button/button";
import * as styles from "./solution-section.css";

interface SolutionSectionProps {
  onAiSolution?: () => void;
}

const SolutionSection = ({ onAiSolution }: SolutionSectionProps) => {
  return (
    <div className={styles.solutionInputWrapper}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <span className={styles.titleText}>
            세모랑 같이 문제를 풀어볼까요?
          </span>
        </div>
        <Button
          label="AI 풀이보기"
          size="40-ai"
          tone="ai"
          icon="ai"
          onClick={onAiSolution}
        />
      </div>
    </div>
  );
};

export default SolutionSection;
