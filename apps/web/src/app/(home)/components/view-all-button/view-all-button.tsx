import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import * as s from "./view-all-button.css";

type ViewAllButtonProps = {
  onClick?: () => void;
  label?: string;
  className?: string;
};

const ViewAllButton = ({
  onClick,
  label = "전체 보기",
  className,
}: ViewAllButtonProps) => {
  return (
    <button type="button" className={clsx(s.root, className)} onClick={onClick}>
      <span className={s.text}>{label}</span>
      <Icon size={1.6} name="chevron" className={s.icon} />
    </button>
  );
};

export default ViewAllButton;
