import clsx from "clsx";
import type { ComponentProps } from "react";
import Icon from "@/shared/components/icon/icon";
import { color } from "@/shared/styles/color.css";
import { typo } from "@/shared/styles/typography.css";
import * as s from "@/app/my/components/menu-item/menu-item.css";

type IconName = ComponentProps<typeof Icon>["name"];

type MenuItemProps = {
  iconName: IconName;
  label: string;
  onClick: () => void;
  className?: string;
};

const MenuItem = ({ iconName, label, onClick, className }: MenuItemProps) => {
  return (
    <button
      type="button"
      className={clsx(s.item, className)}
      onClick={onClick}
      aria-label={label}
    >
      <span className={s.left}>
        <Icon name={iconName} size={2.4} />
        <span className={clsx(typo.body2.medium, color["grayscale-900"])}>
          {label}
        </span>
      </span>

      <span className={clsx(s.right, color["grayscale-500"])} aria-hidden>
        <Icon name="chevron" size={2.4} />
      </span>
    </button>
  );
};

export default MenuItem;
