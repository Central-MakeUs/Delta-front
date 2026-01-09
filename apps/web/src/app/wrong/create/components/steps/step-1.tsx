import ActionCard from "@/shared/components/action-card/action-card";
import * as s from "@/app/wrong/create/create.css";

type Step1Props = {
  onNext: () => void;
};

const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className={s.cardSection}>
      <ActionCard
        title="사진 촬영"
        iconName="graphic-camera"
        onClick={onNext}
      />
      <ActionCard
        title="앨범에서 선택"
        iconName="graphic-gallery"
        onClick={onNext}
      />
    </div>
  );
};

export default Step1;
