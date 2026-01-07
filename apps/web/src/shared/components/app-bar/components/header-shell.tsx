import clsx from "clsx";
import type { ReactNode } from "react";

import * as s from "@/shared/components/app-bar/app-bar.css";
import type {
  AppBarSurface,
  AppBarVariant,
} from "@/shared/components/app-bar/types/app-bar";

export const HeaderShell = ({
  variant,
  surface,
  ariaLabel,
  className,
  children,
}: {
  variant: AppBarVariant;
  surface: AppBarSurface;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}) => {
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
