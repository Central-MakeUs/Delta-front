import { useMemo } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/tab-bar/tab-bar.css";
import { TabButton } from "@/shared/components/button/tab-button/tab-button";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";

export type TabItem<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type TabBarProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
  ariaLabel?: string;
  className?: string;
  /** 우측에 액션(전체보기 등) 필요할 때 주입 */
  rightSlot?: ReactNode;
};

const TabBar = <T extends string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "tab bar",
  className,
  rightSlot,
}: TabBarProps<T>) => {
  const firstEnabled = useMemo(
    () => tabs.find((t) => !t.disabled)?.value,
    [tabs]
  );

  const fallbackValue = (tabs[0]?.value ?? ("" as T)) as T;

  const resolvedDefaultValue = (defaultValue ??
    firstEnabled ??
    fallbackValue) as T;

  const [current, setCurrent] = useControllableState<T>({
    value,
    defaultValue: resolvedDefaultValue,
    onChange: onValueChange,
  });

  if (tabs.length === 0) return null;

  const handleSelect = (next: T) => {
    if (next === current) return;
    setCurrent(next);
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div role="tablist" aria-label={ariaLabel} className={styles.tabList}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            isActive={tab.value === current}
            disabled={tab.disabled}
            onClick={() => {
              if (tab.disabled) return;
              handleSelect(tab.value);
            }}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {rightSlot ? <div className={styles.rightSlot}>{rightSlot}</div> : null}
    </div>
  );
};

export default TabBar;
