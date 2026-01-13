import { vars } from "@/shared/styles/theme.css";
import * as styles from "./question-section.css";

const QuestionSection = () => {
  return (
    <div className={styles.imageContainer}>
      {/* 이미지가 있으면 여기에 표시 */}
      <div style={{ color: vars.color.grayscale[400] }}>이미지 영역</div>
    </div>
  );
};

export default QuestionSection;
