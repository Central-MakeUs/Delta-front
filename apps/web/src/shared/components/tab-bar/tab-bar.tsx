import { useMemo } from "react";
import clsx from "clsx";
import * as styles from "@/shared/components/tab-bar/tab-bar.css";
import { TabButton } from "@/shared/components/button/tab-button/tab-button";
import { useControllableState } from "@/shared/components/toggle/hooks/use-controllable-state";

export type TabItem<T extends string> = {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
};

export type TabBarProps<T extends string> = {
  tabs: readonly TabItem<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (next: T) => void;
  ariaLabel?: string;
  className?: string;
};

export const TabBar = <T extends string>(props: TabBarProps<T>) => {
  if (props.tabs.length === 0) return null;
  return <TabBarImpl {...props} />;
};

const TabBarImpl = <T extends string>({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "tab bar",
  className,
}: TabBarProps<T>) => {
  const firstEnabled = useMemo(
    () => tabs.find((t) => !t.disabled)?.value,
    [tabs]
  );

  const resolvedDefaultValue = (defaultValue ??
    firstEnabled ??
    tabs[0].value) as T;

  const [current, setCurrent] = useControllableState<T>({
    value,
    defaultValue: resolvedDefaultValue,
    onChange: onValueChange,
  });

  const handleSelect = (next: T) => {
    if (next === current) return;
    setCurrent(next);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={clsx(styles.tabBar(), className)}
    >
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
  );
};
