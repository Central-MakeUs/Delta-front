"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import Icon from "@/shared/components/icon/icon";
import type { IconProps } from "@/shared/components/icon/icon";
import * as styles from "@/shared/components/button/fab-button/fab-button.css";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon?: IconProps["name"];
  iconSize?: number;
  label?: string;
};

const FabButton = ({
  icon = "file",
  iconSize = 2.4,
  label = "오답 등록하기",
  className,
  type = "button",
  onClick,
  ...rest
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const SHOW_ON_PATHS = [
    ROUTES.HOME,
    ROUTES.WRONG.ROOT,
    ROUTES.GRAPH.ROOT,
  ] as const;

  if (!SHOW_ON_PATHS.includes(pathname as (typeof SHOW_ON_PATHS)[number]))
    return null;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    router.push(ROUTES.WRONG.CREATE);
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
