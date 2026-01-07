import BackButton from "@/shared/components/app-bar/components/back-button";
import * as s from "@/shared/components/app-bar/app-bar.css";

export const LeftGroup = ({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) => {
  return (
    <div className={s.leftGroup}>
      <BackButton onClick={onBack} />
      <span className={s.title}>{title}</span>
    </div>
  );
};

export default LeftGroup;
