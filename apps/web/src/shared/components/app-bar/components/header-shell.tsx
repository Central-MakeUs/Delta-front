import clsx from "clsx";
import type { ReactNode } from "react";

import * as s from "@/shared/components/app-bar/app-bar.css";
import type {
  AppBarSurface,
  AppBarVariant,
} from "@/shared/components/app-bar/types/app-bar";

export interface HeaderShellProps {
  variant: AppBarVariant;
  surface: AppBarSurface;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

export const HeaderShell = ({
  variant,
  surface,
  ariaLabel,
  className,
  children,
}: HeaderShellProps) => {
  return (
    <header
      className={clsx(s.root({ variant, surface }), className)}
      aria-label={ariaLabel}
    >
      {children}
    </header>
  );
};

export default HeaderShell;
