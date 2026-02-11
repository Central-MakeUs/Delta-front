"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import clsx from "clsx";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";
import * as styles from "@/shared/components/button/fab-button/fab-button.css";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon?: IconProps["name"];
  iconSize?: number;
  label?: string;
  onFabClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FabButton = ({
  icon = "file",
  iconSize = 2.4,
  label = "오답 등록하기",
  className,
  type = "button",
  onFabClick,
  ...rest
}: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onFabClick?.(e);
  };

  const ariaLabel = rest["aria-label"] ?? label;

  return (
    <div className={styles.fabDock}>
      <button
        type={type}
        className={clsx(styles.fabButton, className)}
        aria-label={ariaLabel}
        onClick={handleClick}
        {...rest}
      >
        <Icon name={icon} size={iconSize} className={styles.icon} />
      </button>
    </div>
  );
};

export default FabButton;
