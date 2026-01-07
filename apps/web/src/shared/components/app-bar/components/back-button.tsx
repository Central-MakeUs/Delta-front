import Icon from "@/shared/components/icon/icon";
import * as s from "@/shared/components/app-bar/app-bar.css";

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className={s.buttonReset}
      aria-label="뒤로가기"
      onClick={onClick}
    >
      <Icon name="chevron" rotate={180} size={2.4} className={s.icon} />
    </button>
  );
};

export default BackButton;
