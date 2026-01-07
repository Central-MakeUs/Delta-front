"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useCallback, useMemo } from "react";
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

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
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

  const isVisible = useMemo(() => {
    const current = normalizePath(pathname ?? "/");
    return current === ROUTES.HOME || current === ROUTES.WRONG.ROOT;
  }, [pathname]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      router.push(ROUTES.WRONG.CREATE);
    },
    [onClick, router]
  );

  if (!isVisible) return null;

  const ariaLabel = rest["aria-label"] ?? label;

  return (
    <button
      type={type}
      className={clsx(styles.fabButton, className)}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...rest}
    >
      <Icon name={icon} size={iconSize} className={styles.icon} />
    </button>
  );
};

export default FabButton;
