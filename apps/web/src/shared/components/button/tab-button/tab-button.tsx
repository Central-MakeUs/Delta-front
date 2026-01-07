import { forwardRef } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/button/tab-button/tab-button.css";

export type TabButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  isActive?: boolean;
};

export const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ isActive = false, className, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        disabled={disabled}
        className={clsx(
          styles.tabButton({ state: isActive ? "active" : "inactive" }),
          className
        )}
        {...rest}
      />
    );
  }
);

TabButton.displayName = "TabButton";
