import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";
import * as styles from "@/shared/components/button/fab-button/fab-button.css";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon?: IconProps["name"];
  iconSize?: number;
  label?: string;
};

export const FabButton = ({
  icon = "file",
  iconSize = 2.4,
  label,
  className,
  type = "button",
  ...rest
}: Props) => {
  const ariaLabel = rest["aria-label"] ?? label;

  return (
    <button
      type={type}
      className={clsx(styles.fabButton, className)}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon name={icon} size={iconSize} className={styles.icon} />
    </button>
  );
};
