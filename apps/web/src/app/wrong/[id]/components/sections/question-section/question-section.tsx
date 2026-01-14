import Image from "next/image";
import { vars } from "@/shared/styles/theme.css";
import * as styles from "./question-section.css";
import { WrongDetailData } from "../../mocks/wrong-dummy";

const QuestionSection = ({ imagePath }: WrongDetailData) => {
  return (
    <div className={styles.imageContainer}>
      {imagePath ? (
        <Image
          src={imagePath}
          alt="문제 이미지"
          width={375}
          height={238}
          className={styles.image}
          priority
        />
      ) : (
        <div style={{ color: vars.color.grayscale[400] }}>이미지 영역</div>
      )}
    </div>
  );
};

export default QuestionSection;
