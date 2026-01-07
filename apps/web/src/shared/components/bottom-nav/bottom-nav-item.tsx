import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import type { IconName } from "@/shared/components/bottom-nav/constants/bottom-nav";
import * as s from "@/shared/components/bottom-nav/bottom-nav.css";

type Props = {
  isActive: boolean;
  label: string;
  iconName: IconName;
  onClick: () => void;
};

export const BottomNavItem = ({
  isActive,
  label,
  iconName,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      className={s.item}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      <span
        className={clsx(s.iconWrap, isActive ? s.iconActive : s.iconInactive)}
      >
        <Icon size={2.4} name={iconName} />
      </span>

      <span
        className={clsx(s.label, isActive ? s.labelActive : s.labelInactive)}
      >
        {label}
      </span>
    </button>
  );
};

export default BottomNavItem;
