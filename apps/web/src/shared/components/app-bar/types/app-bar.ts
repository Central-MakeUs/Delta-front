import type { IconProps } from "@/shared/components/icon/icon";

export type AppBarSurface = "solid" | "transparent";
export type AppBarVariant =
  | "basic"
  | "basicAction"
  | "default"
  | "progress"
  | "title"
  | "graphTabs";

export type CommonProps = {
  className?: string;
  ariaLabel?: string;
  surface?: AppBarSurface;
};

export type BasicProps = CommonProps & {
  variant: "basic";
  title: string;
  onBack?: () => void;
};

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type ActionMenuItem = {
  label: string;
  tone?: "default" | "danger";
  onClick: () => void;
};

export type ActionMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items: NonEmptyArray<ActionMenuItem>;
};

export type BasicActionProps = CommonProps & {
  variant: "basicAction";
  title: string;

  actionLabel?: string;
  actionIcon?: IconProps["name"];
  actionIconSize?: number;

  onBack?: () => void;
  onActionClick?: () => void;
  actionAriaLabel?: string;

  actionMenu?: ActionMenuProps;
};

export type DefaultProps = CommonProps & {
  variant: "default";
  onLogoClick?: () => void;
  onProClick?: () => void;
  onUserClick?: () => void;
};

export type ProgressProps = CommonProps & {
  variant: "progress";
  total: number;
  currentStep: number;
  onBack?: () => void;
  onSkip?: () => void;
  skipLabel?: string;
  onStepChange?: (nextStep: number) => void;
};

export type TitleOnlyProps = CommonProps & {
  variant: "title";
  title: string;
};

export type TabItem<V extends string = string> = {
  value: V;
  label: string;
};

export type GraphTabsProps<V extends string = string> = CommonProps & {
  variant: "graphTabs";
  tabs: NonEmptyArray<TabItem<V>>;
  value: V;
  onValueChange: (next: V) => void;
  onBack?: () => void;
  tabsAriaLabel?: string;
};

export type AppBarProps =
  | BasicProps
  | BasicActionProps
  | DefaultProps
  | ProgressProps
  | TitleOnlyProps
  | GraphTabsProps;
